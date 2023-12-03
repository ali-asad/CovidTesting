import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import Stripe from 'stripe';
import axios from 'axios';
import { format, isBefore, parse } from 'date-fns';

import {
  Appointment,
  AppointmentListItem,
  QbenchOrderResponse,
  AppointmentsListParams,
} from './types';
import sendgrid from './services/sendgrid';
import qbench from './services/qbench';
import twilio from './services/twilio';
import { config } from './config';
import {
  convertPST2UTC,
  getPeriodsLabelsFromSchedule,
  normalizeResultName,
} from './utils';

import { TestState } from '../../src/dictionaries';

const stripe = new Stripe(functions.config().stripe.secret, {
  apiVersion: '2020-08-27',
});

const adminFirestoreClient = new admin.firestore.v1.FirestoreAdminClient();

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const db = admin.firestore();

const periodsLabels = getPeriodsLabelsFromSchedule();

export const createPaymentIntent = functions.https.onCall(async (data) => {
  try {
    return await stripe.paymentIntents.create(data);
  } catch (err) {
    functions.logger.error('createPaymentIntent', err);

    throw new functions.https.HttpsError('unknown', 'Stripe API error');
  }
});

export const createAppointment = functions.https.onCall(
  async (appointment: Appointment) => {
    try {
      const accessToken = await qbench.getAccessToken();

      const specimenCount = appointment.minors.length + 1;

      const orderCreateResult = await axios({
        method: 'post',
        url: `${config.qbenchUrl}/qbench/api/v1/order`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        data: {
          customer_account_id: appointment.location?.qbenchCustomerId,
          date_received: format(new Date(), 'LL/dd/yyyy'),
          X_EXTERNAL_ORDER_NUMBER: appointment.id,
          X_SPECIMEN_COUNT: specimenCount,
        },
      });

      const qbenchId = orderCreateResult.data.id;
      const orderDetails = await qbench.getOrderById(qbenchId);
      const confirmationId = orderDetails.custom_formatted_id;

      await axios({
        method: 'post',
        url: `${config.qbenchUrl}/qbench/api/v1/order/${qbenchId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        data: {
          X_PATIENT_EXTERNAL_ID: confirmationId,
          X_EXTERNAL_ORDER_NUMBER: confirmationId,
          appointment_date:
            appointment.slot?.period !== undefined &&
            periodsLabels[appointment.slot?.period]
              ? convertPST2UTC(
                  `${appointment.date} ${
                    periodsLabels[appointment.slot?.period].split(' - ')[0]
                  }`
                )
              : null,
        },
      });

      const accessionId = `${confirmationId}-${specimenCount}`;
      const assigningAuthority = 'Worksite Labs';

      const samples = [
        {
          X_PATIENT_LAST_NAME: appointment.lastName,
          X_PATIENT_FIRST_NAME: appointment.firstName,
          X_PATIENT_DOB: appointment.birthDate,
          X_PATIENT_SEX: appointment.sex,
          X_PATIENT_ADDRESS1: appointment.address.address,
          X_PATIENT_CITY: appointment.address.city,
          X_PATIENT_STATE: appointment.address.state,
          X_PATIENT_ZIP_CODE: appointment.address.zipCode,
        },
        ...appointment.minors.map((minor) => ({
          X_PATIENT_LAST_NAME: minor.lastName,
          X_PATIENT_FIRST_NAME: minor.firstName,
          X_PATIENT_DOB: minor.birthDate,
        })),
      ];

      const samplesWithAdditionalData = samples.map((sample, i) => ({
        ...sample,
        X_PATIENT_EXTERNAL_ID: `${confirmationId}-${i + 1}`,
        X_EXTERNAL_ACCESSION_ID: accessionId,
        X_ASSIGNING_AUTHORITY: assigningAuthority,
        order_id: qbenchId,
      }));

      for (let i = 0; i < samples.length; i++) {
        const result = await axios({
          method: 'post',
          url: `${config.qbenchUrl}/qbench/api/v1/sample`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          data: {
            ...samplesWithAdditionalData[i],
          },
        });

        if (result.data.id) {
          await axios({
            method: 'post',
            url: `${config.qbenchUrl}/qbench/api/v1/test`,
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            data: {
              sample_id: result.data.id,
              assay_id: 1,
            },
          });
        }
      }

      await sendgrid.sendConfirmationEmail(confirmationId, appointment, false);

      // create firestore appointment
      await db
        .collection('appointments')
        .doc(appointment.id)
        .set({
          ...appointment,
          phone: appointment.phone.replace(/[^0-9]+/g, ''),
          qbenchId,
          confirmationId,
          isDone: false,
        });

      return {
        id: confirmationId,
      };
    } catch (err) {
      functions.logger.error('sendConfirmationEmail', err);

      throw new functions.https.HttpsError(
        'unknown',
        'Create Appointment Error'
      );
    }
  }
);

export const getPrices = functions.https.onCall(async () => {
  try {
    return await stripe.prices.list();
  } catch (err) {
    functions.logger.error('getPrices', err);

    throw new functions.https.HttpsError('unknown', 'getPrices');
  }
});

export const getQbenchOrderById = functions.https.onCall(async (id: string) => {
  try {
    return qbench.getOrderById(id);
  } catch (err) {
    functions.logger.error('getQbenchOrderById', err);

    throw new functions.https.HttpsError('unknown', 'getQbenchOrderById');
  }
});

export const cancelAppointment = functions.https.onCall(async (id: string) => {
  try {
    const result = await db
      .collection(config.collections.appointments)
      .doc(id)
      .get();

    const appointment = result.data();

    if (!appointment) {
      throw new Error('There is no appointment with provided id');
    }

    const qbenchOrder: QbenchOrderResponse = await qbench.getOrderById(
      appointment.qbenchId
    );

    if (
      qbenchOrder.samples.some((sample) =>
        sample.tests.some(
          (test) => test.state === TestState.Completed && test.results !== null
        )
      )
    ) {
      throw new Error('resultsExist');
    }

    await stripe.refunds.create({
      payment_intent: appointment.paymentIntentId,
    });
    await qbench.deleteOrder(appointment.qbenchId);
    await db.collection(config.collections.appointments).doc(id).delete();
  } catch (err) {
    functions.logger.error('cancelAppointment', err);

    let error = 'Error while cancelling appointment, please contact support';
    let errorCode: any = 'unknown';

    if (err.message === 'resultsExist') {
      error = "Can't cancel the appointment with results being processed";
      errorCode = 'aborted';
    }

    throw new functions.https.HttpsError(errorCode, error);
  }
});

export const rescheduleAppointment = functions.https.onCall(
  async (appointment: Appointment) => {
    try {
      if (!appointment.confirmationId) {
        throw new Error(
          'Only confirmed appointments can be rescheduled (confirmationId equals undefined)'
        );
      }

      await db
        .collection(config.collections.appointments)
        .doc(appointment.id)
        .update(appointment);

      await sendgrid.sendConfirmationEmail(
        appointment.confirmationId,
        appointment,
        true
      );
    } catch (err) {
      functions.logger.error('rescheduleAppointment', err);

      throw new functions.https.HttpsError('unknown', 'rescheduleAppointment');
    }
  }
);

export const getAppointmentsByDate = functions.https.onCall(
  async (params: AppointmentsListParams) => {
    const querySnapshot = await db
      .collection(config.collections.appointments)
      .where('date', '==', params.date)
      .where('location.qbenchCustomerId', '==', params.locationQbenchId)
      .get();

    const appointments: Appointment[] = querySnapshot.docs.map(
      (doc) => doc.data() as Appointment
    );

    const qbenchOrders: (QbenchOrderResponse | null)[] = await qbench.getOrdersByIds(
      appointments.map((appt) => appt.qbenchId)
    );

    return appointments.reduce(
      (acc: AppointmentListItem[], appt: Appointment, i: number) => {
        const order = qbenchOrders.find((o) => o?.id === appt.qbenchId);
        const orderSamples = order?.samples;

        if (orderSamples && orderSamples.length > 0) {
          for (let j = 0; j < orderSamples.length; j++) {
            const sample = orderSamples[j];
            let results =
              order?.samples[j]?.tests?.[0]?.state === TestState.Completed
                ? normalizeResultName(order?.samples[j]?.tests?.[0]?.results)
                : '';

            acc.push({
              period:
                appt.slot?.period !== undefined && appt.slot?.period >= 0
                  ? appt.slot?.period
                  : null,
              firstName: j === 0 ? appt.firstName : sample.X_PATIENT_FIRST_NAME,
              lastName: j === 0 ? appt.lastName : sample.X_PATIENT_LAST_NAME,
              birthDate: j === 0 ? appt.birthDate : sample.X_PATIENT_DOB,
              phone: j === 0 ? appt.phone : null,
              departureDateAndTime: appt.departureDateAndTime,
              symptoms: j === 0 ? appt.symptoms : [],
              hadContact: j === 0 ? appt.hadContact : null,
              results,
              id: appt.id,
              confirmationId: appt.confirmationId,
              email: appt.email,
              sampleId: sample.id,
            });
          }
        }

        return acc;
      },
      []
    );
  }
);

export const sendAppointmentReminder = functions.pubsub
  .schedule('5 0 * * *')
  .onRun(async () => {
    try {
      const querySnapshot = await db
        .collection(config.collections.appointments)
        .where('date', '==', format(new Date(), config.dateFormat))
        .get();

      const todayAppointments: Appointment[] = querySnapshot.docs.map(
        (doc) => doc.data() as Appointment
      );

      if (todayAppointments.length > 0) {
        await Promise.all(
          todayAppointments.map((appt) => {
            return twilio
              .sendTextMessage(
                appt.phone,
                `Your COVID-19 test is today at ${appt.location?.address1} ${
                  appt.location?.address2
                } ${
                  appt.slot?.period
                    ? ` at ${periodsLabels[appt.slot.period].split(' - ')[0]}`
                    : ''
                }.`
              )
              .catch((err) => {
                functions.logger.error(
                  `sendRemindMessage / fail to send message to ${appt.phone}`,
                  err
                );
              });
          })
        );
      }
    } catch (err) {
      functions.logger.error('sendRemindMessage', err);
    }
  });

export const checkResults = functions.pubsub
  .schedule('0 */1 * * *')
  .onRun(async () => {
    try {
      const querySnapshot = await db
        .collection(config.collections.appointments)
        .where('isDone', '==', false)
        .get();

      const allAppointments: Appointment[] = querySnapshot.docs.map(
        (doc) => doc.data() as Appointment
      );

      const appointments = allAppointments.filter((appt) => {
        if (appt.date) {
          const date = parse(appt.date, config.dateFormat, new Date());

          return isBefore(date, new Date());
        }

        return false;
      });

      const qbenchOrders: (QbenchOrderResponse | null)[] = await qbench.getOrdersByIds(
        appointments.map((appt) => appt.qbenchId)
      );

      const doneAppointments = appointments.filter((appt, i) =>
        qbenchOrders[i]?.samples.every((sample) =>
          sample.tests.some(
            (test) =>
              test.state === TestState.Completed && test.results !== null
          )
        )
      );

      await Promise.all(
        doneAppointments.map((appt) =>
          sendgrid.sendResultsNotificationEmail(appt.email).catch((err) => {
            functions.logger.error('checkResults / send email', err);
          })
        )
      );

      await Promise.all(
        doneAppointments.map((appt) =>
          twilio
            .sendTextMessage(
              appt.phone,
              `Worksite Labs: Your test result is ready. To view it go to https://schedulecovidtesting.com/manage.`
            )
            .catch((err) => {
              functions.logger.error('checkResults / send message', err);
            })
        )
      );

      await Promise.all(
        doneAppointments.map((appt) =>
          db
            .collection(config.collections.appointments)
            .doc(appt.id)
            .update({ isDone: true })
            .catch((err) => {
              functions.logger.error('checkResults / update appt', err);
            })
        )
      );
    } catch (err) {
      functions.logger.error('checkResults', err);
    }
  });

export const sendConfirmationEmail = functions.https.onCall(
  async (emailIds: string[]) => {
    try {
      const snapshots = await Promise.all(
        emailIds.map((emailId) =>
          db
            .collection(config.collections.appointments)
            .where('email', '==', emailId)
            .get()
        )
      );

      const appointments: Appointment[] = snapshots.map(
        (snapshot) => (snapshot?.docs?.[0]?.data() as Appointment) || null
      );

      await Promise.all(
        appointments.map((appt) =>
          appt && appt.confirmationId
            ? sendgrid
                .sendConfirmationEmail(appt.confirmationId, appt, false)
                .catch((err) => {
                  functions.logger.error(
                    `email was not sent to ${appt.email}`,
                    err
                  );
                })
            : null
        )
      );

      return 'OK';
    } catch (err) {
      functions.logger.error('sendConfirmationEmail', err);

      throw new functions.https.HttpsError('unknown', 'sendConfirmationEmail');
    }
  }
);

export const scheduledFirestoreExport = functions.pubsub
  .schedule('every 24 hours')
  .onRun(async (context) => {
    const bucket = 'gs://worksite-labs-backup';
    const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT;

    // skip for dev env
    if (projectId !== 'worksite-labs-ccb7d') {
      return;
    }

    const databaseName = adminFirestoreClient.databasePath(
      projectId,
      '(default)'
    );

    try {
      const responses = await adminFirestoreClient.exportDocuments({
        name: databaseName,
        outputUriPrefix: bucket,
        collectionIds: [],
      });

      const response = responses[0];

      functions.logger.log('scheduledFirestoreExport', {
        response,
      });
    } catch (err) {
      functions.logger.error('scheduledFirestoreExport', err);
    }
  });

export const getResultsPDFDownloadLink = functions.https.onCall(
  async (sampleId: string) => {
    try {
      return qbench.getResultsReportUrl(sampleId);
    } catch (err) {
      functions.logger.error('getResultsPDFDownloadLink', err);

      throw new functions.https.HttpsError(
        'unknown',
        'getResultsPDFDownloadLink'
      );
    }
  }
);
