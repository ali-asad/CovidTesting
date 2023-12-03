import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import styled from 'styled-components';
import { format, parse } from 'date-fns';

import pin from '../../../../assets/pin-grey.svg';
import calendar from '../../../../assets/calendar-grey.svg';
import clock from '../../../../assets/clock.svg';

import {
  Container,
  Content,
  PageHeader,
  PageTitle,
  PageSubTitle,
  Button,
} from '../../../shared/components/styled';
import { colors } from '../../../../styles/colors';
import {
  useStepsDispatch,
  useStepsState,
} from '../../provider';
import { Breakpoints } from '../../../../dictionaries';
import { config } from '../../../../config';
import { getPeriodsFromSchedule } from '../../../../utils';

import Checkbox from '../../../shared/components/form/Checkbox';
import NavigationButtons from '../../../shared/components/NavigationButtons';
import ChangeLocationModal from '../../../shared/components/ChangeLocationModal';
import ChangeDateTimeModal from './ChangeDateTimeModal';
import PaymentModal from './PaymentModal';
// import EditableInfo from './EditableInfo';

const Checkboxes = styled.div`
  margin-bottom: 50px;
`;

const Title = styled.h3`
  font-size: 20px;
  line-height: 22px;
  margin: 0 0 21px 0;
`;

export const TestingInfoContainer = styled.div`
  background: ${colors.blue8};
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 6px;

  & > * {
    &:first-child {
      margin-bottom: 20px;
    }
  }

  @media (min-width: ${Breakpoints.sm}px) {
    flex-direction: row;
    padding: 30px;
    justify-content: space-between;

    & > * {
      &:first-child {
        margin-bottom: 0;
      }
    }
  }
`;

export const Icon = styled.div`
  position: absolute;
  left: 0;
  top: 1px;
`;

export const PinIcon = styled(Icon)`
  left: 5px;
  width: 14px;
  height: 20px;
  background: url(${pin}) no-repeat center center;
`;

export const CalendarIcon = styled(Icon)`
  width: 24px;
  height: 24px;
  background: url(${calendar}) no-repeat center center;
`;

export const ClockIcon = styled(Icon)`
  width: 24px;
  height: 24px;
  background: url(${clock}) no-repeat center center;
`;

export const TestingInfoRow = styled.div`
  display: flex;
  flex-direction: column;
  margin: -8px 0;

  & > * {
    margin: 8px 0;
  }

  @media (min-width: ${Breakpoints.md}px) {
    flex-direction: row;
    margin: 0 -30px;

    & > * {
      margin: 0 30px;
    }
  }
`;

export const TestingInfo = styled.div`
  position: relative;
  padding-left: 31px;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const TestingInfoBtn = styled(Button)`
  max-width: 200px;
`;

// const EditableInfosWrapper = styled.div`
//   margin-top: 40px;
// `;

const periods = getPeriodsFromSchedule(config.schedule);

const ConfirmAndPay: React.FC = () => {
  const {
    form: {
      commitToAttend,
      agreeToCancel,
      location,
      phone,
      date,
      slot,
      firstName,
      lastName,
    },
  } = useStepsState();
  const { toggleChangeLocationModal, updateFormValues } = useStepsDispatch();
  const [showChangeDatetimeModal, setShowChangeDatetimeModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const selectedDate = date
    ? parse(date, config.dateFormat, new Date())
    : new Date();

  return (
    <Container size="lg">
      <Content>
        <PageHeader>
          <PageTitle>Confirm Your Booking Appointment</PageTitle>
          <PageSubTitle>
            Please review and confirm the information below is correct by
            clicking the “BOOK APPOINTMENT” button.
          </PageSubTitle>
        </PageHeader>
        <Formik
          initialValues={{
            commitToAttend,
            agreeToCancel,
            phone,
            name: `${firstName} ${lastName}`,
          }}
          onSubmit={() => setShowPaymentModal(true)}
        >
          {({ dirty, isValid }) => (
            <Form>
              <Checkboxes>
                <Checkbox
                  name="commitToAttend"
                  onChange={(checked) =>
                    updateFormValues({ commitToAttend: checked })
                  }
                  isRequired
                >
                  I commit to attend this appointment as shown
                </Checkbox>
                <Checkbox
                  name="agreeToCancel"
                  onChange={(checked) =>
                    updateFormValues({ agreeToCancel: checked })
                  }
                  isRequired
                >
                  I AGREE to cancel if I am unable to attend so the appointment
                  can be released to another party
                </Checkbox>
              </Checkboxes>
              <Title>Testing Information</Title>
              <TestingInfoContainer>
                <TestingInfo>
                  <PinIcon />
                  <strong>{location?.name}</strong>
                  <br />
                  {location?.address1} {location?.address2}
                </TestingInfo>
                <TestingInfoBtn
                  type="button"
                  onClick={() => toggleChangeLocationModal(true)}
                  size="sm"
                  libraryType="default"
                >
                  Change Location
                </TestingInfoBtn>
              </TestingInfoContainer>
              <TestingInfoContainer>
                <TestingInfoRow>
                  <TestingInfo>
                    <CalendarIcon />
                    <strong>Date</strong>
                    <br />
                    {format(selectedDate, config.weekDateFormat)}
                  </TestingInfo>
                  <TestingInfo>
                    <ClockIcon />
                    <strong>Time</strong>
                    <br />
                    {slot && periods[slot.period].label}
                  </TestingInfo>
                </TestingInfoRow>
                <TestingInfoBtn
                  type="button"
                  onClick={() => setShowChangeDatetimeModal(true)}
                  size="sm"
                  libraryType="default"
                >
                  Change Date & Time
                </TestingInfoBtn>
              </TestingInfoContainer>
              {/*<EditableInfosWrapper>*/}
              {/*  <EditableInfo label="Name" name="name" value={name} />*/}
              {/*  <EditableInfo label="Phone" name="phone" value={phone} />*/}
              {/*</EditableInfosWrapper>*/}
              <NavigationButtons
                confirmBtnText="Confirm & Pay"
                isValid={commitToAttend && agreeToCancel}
              />
            </Form>
          )}
        </Formik>
      </Content>
      <ChangeLocationModal />
      <ChangeDateTimeModal
        showModal={showChangeDatetimeModal}
        closeModal={() => setShowChangeDatetimeModal(false)}
      />
      <PaymentModal
        showModal={showPaymentModal}
        closeModal={() => setShowPaymentModal(false)}
      />
    </Container>
  );
};

export default ConfirmAndPay;
