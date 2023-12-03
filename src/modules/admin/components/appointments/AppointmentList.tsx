import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import { parse, format } from 'date-fns';

import {
  Container,
  Content,
  PageHeader,
  PageTitle,
} from '../../../shared/components/styled';
import { DatepickerField } from '../../../shared/components/Datepicker';
import FormLabel from '../../../shared/components/form/FormLabel';
import Input from '../../../shared/components/form/Input';
import { useAdminState, useAdminDispatch } from '../../provider';
import { colors } from '../../../../styles/colors';
import { config } from '../../../../config';
import { getAppointmentsByDate, downloadResultsPDF } from '../../api';
import { getPeriodsFromSchedule } from '../../../../utils';
import { AppointmentListItem } from '../../models';
import ColHeaderSortable from '../../../shared/components/ColHeaderSortable';
import Cancel from './Cancel';
import DownloadCSV from './DownloadCSV';
import SendConfirmation from './SendConfirmation';
import Select from '../../../shared/components/form/Select';
import { ResponsiveTable } from '../../../shared/components/styled';

const DateFieldWrapper = styled.div`
  max-width: 540px;
`;

const Skeleton = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100px;
`;

const ButtonColWrapper = styled.div`
  width: 80px;
`;

const ResultsButton = styled.button`
  border: 0;
  background: none;
  cursor: pointer;
  color: ${colors.blue};
  text-decoration: underline;
`;

const HeaderButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  & > * {
    min-width: 200px;

    &:not(:last-child) {
      margin-right: 20px;
    }
  }
`;

const periods = getPeriodsFromSchedule(config.schedule);
const locationsOptions = config.locations.map((location) => ({
  value: location.qbenchCustomerId,
  label: location.name,
}));

const AppointmentList: React.FC = () => {
  const { params, appointments, searchQuery } = useAdminState();
  const { updateParams, setAppointments, searchTable } = useAdminDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getAppointmentsByDate(params)
      .then((res) => {
        setAppointments(
          res.data
            .sort((a: AppointmentListItem, b: AppointmentListItem) => {
              if (a.period !== null && b.period !== null) {
                return a.period - b.period;
              }
              return 0;
            })
            .map((appt: AppointmentListItem) => ({
              ...appt,
              period:
                appt.period !== null && appt.period >= 0
                  ? periods[appt.period].label
                  : '-',
              hadContact: appt.hadContact ? 'Yes' : 'No',
            }))
        );
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [JSON.stringify(params)]);

  const initialLocation = config.locations.find(
    (loc) => loc.qbenchCustomerId === params.locationQbenchId
  );

  return (
    <Container size="xxl">
      <Content>
        <PageHeader>
          <PageTitle>Scheduled Appointments</PageTitle>
        </PageHeader>
        <Formik
          initialValues={{
            date: parse(params.date, config.dateFormat, new Date()),
            location: {
              label: initialLocation?.name,
              value: initialLocation?.qbenchCustomerId,
            },
          }}
          onSubmit={() => {}}
          enableReinitialize={false}
        >
          {() => (
            <Form>
              <HeaderButtons>
                <FormLabel label="Date">
                  <DateFieldWrapper>
                    <DatepickerField
                      name="date"
                      inputPlaceholder="MM/DD/YYYY"
                      onChange={(newDate) =>
                        updateParams({
                          date: format(newDate, config.dateFormat),
                        })
                      }
                    />
                  </DateFieldWrapper>
                </FormLabel>
                <FormLabel label="Location">
                  <Select<number>
                    name="location"
                    options={locationsOptions}
                    onChange={(value) => {
                      updateParams({ locationQbenchId: value });
                    }}
                    validate={(value) => {
                      let error;

                      if (!value) {
                        error = 'Required field';
                      }

                      return error;
                    }}
                  />
                </FormLabel>
                <DownloadCSV />
              </HeaderButtons>
            </Form>
          )}
        </Formik>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            confirmationId: "",
            phoneNumber: "",
            dateOfBirth: "",
            email: "",
          }}
          onSubmit={() => {}}
          enableReinitialize={false}
        >
          <HeaderButtons>
            <FormLabel label="First Name">
              <Input
              name="firstName"
              onChange={(name) =>
                searchTable({
                  firstName: name
                })
              }></Input>
            </FormLabel>
          </HeaderButtons>
        </Formik>
        {loading ? (
          <Skeleton>Loading...</Skeleton>
        ) : (
          <>
            {!appointments || appointments.length === 0 ? (
              <Skeleton>No appointments</Skeleton>
            ) : (
              <ResponsiveTable>
                <table>
                  <thead>
                    <tr>
                      <th>
                        <ColHeaderSortable
                          columnName={'period'}
                          text={'Appt Time'}
                        />
                      </th>
                      <th>
                        <ColHeaderSortable
                          columnName={'confirmationId'}
                          text={'Confirmation ID'}
                        />
                      </th>
                      <th>
                        <ColHeaderSortable
                          columnName={'firstName'}
                          text={'First Name'}
                        />
                      </th>
                      <th>
                        <ColHeaderSortable
                          columnName={'lastName'}
                          text={'Last Name'}
                        />
                      </th>
                      <th>
                        <ColHeaderSortable
                          columnName={'email'}
                          text={'Email'}
                        />
                      </th>
                      <th>
                        <ColHeaderSortable
                          columnName={'birthDate'}
                          text={'DOB'}
                        />
                      </th>
                      <th>
                        <ColHeaderSortable
                          columnName={'phone'}
                          text={'Phone Number'}
                        />
                      </th>
                      <th>
                        <ColHeaderSortable
                          columnName={'departureDateAndTime'}
                          text={'Flight Date and Time'}
                        />
                      </th>
                      <th>
                        <ColHeaderSortable
                          columnName={'symptoms'}
                          text={'Symptoms Reported?'}
                        />
                      </th>
                      <th>
                        <ColHeaderSortable
                          columnName={'hadContact'}
                          text={'Contact in last 14 days?'}
                        />
                      </th>
                      <th>
                        <ColHeaderSortable
                          columnName={'results'}
                          text={'Results'}
                        />
                      </th>
                      <th>
                        <ButtonColWrapper>Cancel</ButtonColWrapper>
                      </th>
                      <th>
                        <ButtonColWrapper>Send Confirmation</ButtonColWrapper>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appt, i) => {
                      return (
                        <tr key={`${appt.firstName}-${appt.lastName}-${i}`}>
                          <td>{appt.period}</td>
                          <td>{appt.confirmationId}</td>
                          <td>{appt.firstName}</td>
                          <td>{appt.lastName}</td>
                          <td>{appt.email}</td>
                          <td>{appt.birthDate}</td>
                          <td>{appt.phone}</td>
                          <td>{appt.departureDateAndTime}</td>
                          <td>
                            {appt.symptoms.length > 0
                              ? appt.symptoms.map((symptom, i) => (
                                  <span key={i}>
                                    {symptom}
                                    <br />
                                  </span>
                                ))
                              : 'None'}
                          </td>
                          <td>{appt.hadContact}</td>
                          <td>
                            {appt.results && (
                              <ResultsButton
                                type="button"
                                onClick={() => {
                                  downloadResultsPDF(appt.sampleId);
                                }}
                              >
                                {appt.results}
                              </ResultsButton>
                            )}
                          </td>
                          <td>
                            <Cancel appt={appt} />
                          </td>
                          <td>
                            <SendConfirmation email={appt.email} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </ResponsiveTable>
            )}
          </>
        )}
      </Content>
    </Container>
  );
};

export default AppointmentList;
