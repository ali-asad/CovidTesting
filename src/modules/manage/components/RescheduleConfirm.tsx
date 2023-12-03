import React from 'react';
import styled from 'styled-components';

import {
  Button,
  Container,
  Content,
  PageHeader,
  PageTitle,
} from '../../shared/components/styled';
import { Breakpoints } from '../../../dictionaries';

const Text = styled.p`
  margin-bottom: 45px;
`;

const CancelBtn = styled(Button)`
  width: 100%;

  @media (min-width: ${Breakpoints.sm}px) {
    width: 450px;
  }
`;

const RescheduleConfirm: React.FC = () => {
  return (
    <Container size="md">
      <Content>
        <PageHeader>
          <PageTitle>Your appointment has been rescheduled.</PageTitle>
        </PageHeader>
        <Text>
          If you would like to make a new appointment, please click on the
          button below.
        </Text>
        <CancelBtn
          type="button"
          libraryType="primary"
          onClick={() => (window.location.pathname = '/')}
        >
          Schedule New Appointment
        </CancelBtn>
      </Content>
    </Container>
  );
};

export default RescheduleConfirm;
