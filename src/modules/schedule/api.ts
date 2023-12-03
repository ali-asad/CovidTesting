import { parseSnapshot } from '../../utils';
import { config } from '../../config';
import { firebase } from '../../firebase';
import { Slot } from './models';
import { Appointment } from '../shared/models';

const db = firebase.firestore();

export const subscribeOnAppointmentsUpdate = (
  { date, locationId }: { date: string; locationId: number },
  onSnapshot: any
) =>
  db
    .collection(config.firestoreCollections.schedules)
    .where('date', '==', date)
    .where('locationId', '==', locationId)
    .onSnapshot((snapshot) => onSnapshot(parseSnapshot(snapshot)));

export const reserveSlot = async (
  reserve: Slot,
  release: Slot | null,
  numberOfGuests: number
): Promise<any> => {
  const appointments = await getAppointmentsByDateAndLocation({
    date: reserve.date,
    locationId: reserve.locationId,
  });

  if (appointments) {
    const {
      data: { appointmentsPerPeriod },
      id,
    } = appointments;

    if (appointmentsPerPeriod[reserve.period] === config.maxSlotsByPeriod) {
      throw new Error('No available slots for period');
    }

    const newAppointments = {
      ...appointmentsPerPeriod,
      [reserve.period]:
        appointmentsPerPeriod[reserve.period] !== undefined
          ? appointmentsPerPeriod[reserve.period] + numberOfGuests
          : numberOfGuests,
    };

    if (release) {
      if (reserve.date === release.date) {
        newAppointments[release.period] =
          appointmentsPerPeriod[release.period] !== undefined
            ? appointmentsPerPeriod[release.period] - numberOfGuests
            : 0;
      } else {
        releaseSlot(release);
      }
    }

    return db
      .collection(config.firestoreCollections.schedules)
      .doc(id)
      .update({ appointmentsPerPeriod: newAppointments });
  }

  if (release) {
    releaseSlot(release);
  }

  return db.collection(config.firestoreCollections.schedules).add({
    date: reserve.date,
    locationId: reserve.locationId,
    appointmentsPerPeriod: {
      [reserve.period]: numberOfGuests,
    },
  });
};

export const releaseSlot = async (slot: Slot) => {
  const appointments = await getAppointmentsByDateAndLocation({
    date: slot.date,
    locationId: slot.locationId,
  });

  if (appointments === null) {
    throw new Error('No appointments for period');
  }

  const {
    data: { appointmentsPerPeriod },
    id,
  } = appointments;

  return db
    .collection(config.firestoreCollections.schedules)
    .doc(id)
    .update({
      appointmentsPerPeriod: {
        ...appointmentsPerPeriod,
        [slot.period]: appointmentsPerPeriod[slot.period]
          ? appointmentsPerPeriod[slot.period] - 1
          : 0,
      },
    });
};

export const createPaymentIntent = async ({
  amount,
  currency,
}: {
  amount: number;
  currency: string;
}) =>
  firebase.functions().httpsCallable('createPaymentIntent')({
    amount,
    currency,
  });

export const createAppointment = async (appointment: Appointment) =>
  firebase.functions().httpsCallable('createAppointment')(appointment);

export const getAppointmentsByDateAndLocation = ({
  date,
  locationId,
}: {
  date: string;
  locationId: number;
}) =>
  firebase
    .firestore()
    .collection(config.firestoreCollections.schedules)
    .where('date', '==', date)
    .where('locationId', '==', locationId)
    .get()
    .then(parseSnapshot);

export const cancelAppointment = async (id: string) =>
  firebase.functions().httpsCallable('cancelAppointment')(id);

export const getPrices = async () =>
  firebase.functions().httpsCallable('getPrices')();
