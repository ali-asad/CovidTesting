import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import {
  Button,
  Container,
  Content,
  PageHeader,
  PageTitle,
} from '../../shared/components/styled';
import { Breakpoints } from '../../../dictionaries';
import routes from '../../../routes';

const Text = styled.p`
  margin-bottom: 45px;
`;

const CancelBtn = styled(Button)`
  width: 100%;

  @media (min-width: ${Breakpoints.sm}px) {
    width: 450px;
  }
`;

const Cancel: React.FC = () => {
  const history = useHistory();

  return (
    <Container size="md">
      <Content>
        <PageHeader>
          <PageTitle>Your appointment has been cancelled.</PageTitle>
        </PageHeader>
        <Text>
          If you would like to make a new appointment, please click on the
          button below.
        </Text>
        <CancelBtn
          type="button"
          libraryType="primary"
          onClick={() => history.push(routes.schedule)}
        >
          Schedule New Appointment
        </CancelBtn>
      </Content>
    </Container>
  );
};

export default Cancel;
