import React from 'react';
import styled from 'styled-components';
import { useAdminState } from '../../provider';
import { CSVLink } from 'react-csv';
import { parse, format } from 'date-fns';
import { config } from '../../../../config';

const Wrapper = styled.div`
  width: 150px;
  padding-bottom: 10px;
  padding-top: 10px;
  a {
    text-decoration: underline;
  }
`;

const headers = [
  { label: 'Appt Time', key: 'period' },
  { label: 'Confirmation ID', key: 'confirmationId' },
  { label: 'First Name', key: 'firstName' },
  { label: 'Last Name', key: 'lastName' },
  { label: 'Email', key: 'email' },
  { label: 'DOB', key: 'birthDate' },
  { label: 'Phone Number', key: 'phone' },
  { label: 'Flight Date and Time', key: 'departureDateAndTime' },
  { label: 'Symptoms Reported?', key: 'symptoms' },
  { label: 'Contact in last 14 days?', key: 'hadContact' },
  { label: 'Results', key: 'results' },
];

const DownloadLinkCSV: React.FC = () => {
  const { params, appointments } = useAdminState();

  return (
    <Wrapper>
      {Array.isArray(appointments) && appointments.length > 0 ? (
        <CSVLink
          data={
            appointments
              ? appointments.map((appt) => ({
                  ...appt,
                  symptoms:
                    Array.isArray(appt.symptoms) && appt.symptoms.length > 0
                      ? appt.symptoms.join(', ')
                      : 'None',
                }))
              : []
          }
          headers={headers}
          filename={`Appointments ${format(
            parse(params.date, config.dateFormat, new Date()),
            config.fileDateFormat
          )}.csv`}
        >
          Download CSV
        </CSVLink>
      ) : null}
    </Wrapper>
  );
};

export default DownloadLinkCSV;
