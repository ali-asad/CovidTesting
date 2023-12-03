import React from 'react';
import styled from 'styled-components';

import { ConfirmationNumber } from './Confirmation';
import { Form } from '../../../shared/models';
import { Period } from '../../models';

const Info = styled.div`
  margin-top: 20px;
`;

const InfoBox = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 20px;

  & > * {
    &:first-child {
      font-weight: bold;
      width: 25%;
    }
  }
`;

interface Props {
  form: Form;
  periods: Period[];
}

const PrintableConfirmation = React.forwardRef<HTMLDivElement, Props>(
  ({ form, periods }, ref) => {
    return (
      <ConfirmationNumber ref={ref}>
        Confirmation #<strong>{form.confirmationId}</strong>
        <Info className="print">
          <InfoBox>
            <div>Location</div>
            <div>
              {form.location?.name}
              <br />
              {form.location?.address1}
              <br />
              {form.location?.address2}
            </div>
          </InfoBox>
          {form.slot?.period && (
            <InfoBox>
              <div>Appointment time</div>
              <div>
                {form.date}
                <br />
                {periods[form.slot?.period].label}
              </div>
            </InfoBox>
          )}
          <InfoBox>
            <div>Patient name{form.minors.length > 0 ? 's' : ''}</div>
            <div>
              {form.firstName} {form.lastName}
              {form.minors.map((minor, i) => (
                <div key={i}>
                  {minor.firstName} {minor.lastName}
                </div>
              ))}
            </div>
          </InfoBox>
          <InfoBox>
            Please remember to bring your ID and your confirmation number to
            your appointment.
          </InfoBox>
        </Info>
      </ConfirmationNumber>
    );
  }
);

export default PrintableConfirmation;
