import React from 'react';
import styled from 'styled-components';
import { isAfter, parse } from 'date-fns';

import {
  useManageState,
  useManageDispatch,
} from '../provider';
import {
  Button,
  Container,
  Content,
  PageHeader,
  PageTitle,
} from '../../shared/components/styled';
import {
  CalendarIcon,
  ClockIcon,
  PinIcon,
  TestingInfo,
  TestingInfoContainer,
  TestingInfoRow,
} from '../../schedule/components/ConfirmAndPay/ConfirmAndPay';
import { ManagePage } from '../dictionaries';
import { getPeriodsFromSchedule } from '../../../utils';
import { config } from '../../../config';

const TestingInfoWrapper = styled.div`
  margin: 40px 0 45px;
`;

const Navigation = styled.div`
  display: flex;
  margin: 0 -6px;

  & > * {
    margin: 0 6px;
  }
`;

const periods = getPeriodsFromSchedule(config.schedule);

function YourTestingInformation() {
  const { appointment } = useManageState();
  const { goToPage } = useManageDispatch();

  return (
    <Container size="md">
      <Content>
        <PageHeader>
          <PageTitle textAlign="center">Your Testing Information</PageTitle>
        </PageHeader>
        <TestingInfoWrapper>
          <TestingInfoContainer>
            <TestingInfo>
              <PinIcon />
              <strong>{appointment?.location?.name}</strong>
              <br />
              {appointment?.location?.address1}{' '}
              {appointment?.location?.address2}
            </TestingInfo>
          </TestingInfoContainer>
          <TestingInfoContainer>
            <TestingInfoRow>
              <TestingInfo>
                <CalendarIcon />
                <strong>Date</strong>
                <br />
                {appointment?.date}
              </TestingInfo>
              <TestingInfo>
                <ClockIcon />
                <strong>Time</strong>
                <br />
                {appointment?.slot && periods[appointment?.slot.period].label}
              </TestingInfo>
            </TestingInfoRow>
          </TestingInfoContainer>
        </TestingInfoWrapper>
        <Navigation>
          {appointment?.date &&
            isAfter(
              parse(appointment?.date, config.dateFormat, new Date()),
              new Date()
            ) && (
              <Button
                type="button"
                libraryType="default"
                onClick={() => goToPage(ManagePage.Cancel)}
              >
                Cancel Appointment
              </Button>
            )}
          <Button
            type="button"
            libraryType="primary"
            onClick={() => goToPage(ManagePage.Reschedule)}
          >
            Reschedule Appointment
          </Button>
        </Navigation>
      </Content>
    </Container>
  );
}

export default YourTestingInformation;
