import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import { parse, format } from 'date-fns';
import * as Sentry from '@sentry/react';

import {
  Button,
  Container,
  Content,
  PageHeader,
  PageSubTitle,
  PageTitle,
} from '../../shared/components/styled';
import { useManageDispatch } from '../provider';
import { isUSPhone } from '../../../validations';
import { ManagePage } from '../dictionaries';
import { getAppointmentByPhoneAndDate, getQbenchOrderById } from '../api';
import { DatepickerField } from '../../shared/components/Datepicker';
import { colors } from '../../../styles/colors';
import { Appointment } from '../../shared/models';
import { QbenchOrderResponse, Result } from '../../admin/models';
import { config } from '../../../config';

import Input from '../../shared/components/form/Input';
import FormLabel from '../../shared/components/form/FormLabel';

const Notice = styled.p`
  margin: 27px 0 65px;
  font-size: 14px;
`;

const Agreement = styled.p`
  margin: 0 0 24px 0;
`;

const Error = styled.div`
  color: ${colors.red};
  margin-top: 15px;
  text-align: center;
`;

function normalizeResultName(result: string) {
  const res = result.toLowerCase();

  if (res === 'detected') {
    return 'POSITIVE';
  }

  return 'NEGATIVE';
}

const VerifyIdentity: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { goToPage, updateAppointment, updateResults } = useManageDispatch();

  return (
    <Container>
      <Content>
        <PageHeader>
          <PageTitle>First, we need to verify your identity.</PageTitle>
          <PageSubTitle>
            One quick step to protect your privacy. All fields are required.
          </PageSubTitle>
        </PageHeader>
        <Formik
          initialValues={{
            birthDate: null,
            phone: '',
          }}
          onSubmit={async ({
            phone,
            birthDate,
          }: {
            phone: string;
            birthDate: Date | null;
          }) => {
            if (birthDate) {
              setLoading(true);
              setError(null);

              try {
                const result = await getAppointmentByPhoneAndDate(
                  phone,
                  birthDate
                );

                if (result && result.data) {
                  const appointment: Appointment = result.data;

                  updateAppointment(appointment);

                  const qbenchOrderResult = await getQbenchOrderById(
                    result.data.qbenchId
                  );

                  const qbenchOrder: QbenchOrderResponse =
                    qbenchOrderResult.data;

                  const results: Result[] = [];

                  qbenchOrder.samples.forEach((sample) => {
                    const completedTests = sample.tests
                      .filter(
                        (test: { results: string | null; state: string }) =>
                          test.state === 'COMPLETED'
                      )
                      .sort((a: any, b: any) => {
                        const aDate = parse(
                          a.complete_date,
                          config.dateTimeFormat,
                          new Date()
                        );
                        const bDate = parse(
                          b.complete_date,
                          config.dateTimeFormat,
                          new Date()
                        );

                        return bDate.getTime() - aDate.getTime();
                      });

                    if (completedTests.length > 0) {
                      const latestTest = completedTests[0];

                      results.push({
                        confirmationId: appointment.confirmationId || '',
                        testResult: latestTest.results
                          ? normalizeResultName(latestTest.results)
                          : '',
                        testMethod: latestTest.assay.method,
                        sampleType:
                          sample.accessioning_type?.value || 'Nasopharyngeal',
                        patientName: `${sample.X_PATIENT_FIRST_NAME} ${sample.X_PATIENT_LAST_NAME}`,
                        patientDOB: sample.X_PATIENT_DOB,
                        collectionDate: appointment.date || '',
                        collectionLocation: appointment.location,
                        provider: sample.X_ASSIGNING_AUTHORITY,
                        reviewedBy:
                          latestTest.X_REVIEWED_BY?.text ||
                          config.reportData.reviewedBy,
                        qbenchId: appointment.qbenchId || '',
                        completeDate: format(
                          parse(
                            latestTest.complete_date,
                            config.dateTimeFormat,
                            new Date()
                          ),
                          config.dateFormat
                        ),
                        specimenCount: qbenchOrder.X_SPECIMEN_COUNT,
                        patientId: sample.X_PATIENT_EXTERNAL_ID,
                        sampleId: sample.id,
                        accessionId: sample.X_EXTERNAL_ACCESSION_ID,
                        technician: config.reportData.technician,
                      });
                    }
                  });

                  if (results.length > 0) {
                    updateResults(results);
                  }

                  goToPage(
                    results.length === 0
                      ? ManagePage.TestingInfo
                      : ManagePage.TestResults
                  );
                } else {
                  setLoading(false);
                  setError('Appointment is not found');
                }
              } catch (e) {
                console.error(e);

                Sentry.withScope((scope) => {
                  scope.setTag('scope', 'verifyIdentity');
                  Sentry.captureException(e);
                });

                setLoading(false);
                setError('Error while fetching appointment');
              }
            }
          }}
          enableReinitialize={false}
        >
          {() => (
            <Form>
              <FormLabel label="Patient’s Date of Birth">
                <DatepickerField
                  name="birthDate"
                  inputPlaceholder="MM/DD/YYYY"
                />
              </FormLabel>
              <FormLabel label="Mobile Number">
                <Input
                  name="phone"
                  noBottomMargin
                  validate={(value) => {
                    let error;

                    if (!isUSPhone.test(value)) {
                      error = 'Please enter valid US phone number';
                    }

                    if (value === '') {
                      error = 'Required field';
                    }

                    return error;
                  }}
                />
                <Notice>
                  The same 10-digit number you used when scheduling.
                </Notice>
              </FormLabel>
              <Agreement>
                By verifying this information you legally confirm that you are
                or are acting as caregiver for this person.
              </Agreement>
              <Button type="submit" libraryType="primary" disabled={loading}>
                {loading ? 'Processing...' : 'Verify Identity'}
              </Button>
              {error && <Error>{error}</Error>}
            </Form>
          )}
        </Formik>
      </Content>
    </Container>
  );
};

export default VerifyIdentity;
