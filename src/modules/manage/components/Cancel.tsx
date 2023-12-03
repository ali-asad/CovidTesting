import React, { useState } from 'react';
import styled from 'styled-components';

import {
  Button,
  Container,
  Content,
  PageHeader,
  PageTitle,
} from '../../shared/components/styled';
import { useManageDispatch, useManageState } from '../provider';
import { Breakpoints } from '../../../dictionaries';
import { ManagePage } from '../dictionaries';
import { cancelAppointment } from '../../schedule/api';
import { colors } from '../../../styles/colors';

const CancelBtn = styled(Button)`
  width: 100%;

  @media (min-width: ${Breakpoints.sm}px) {
    width: 450px;
  }
`;

const Text = styled.p`
  margin-bottom: 45px;
`;

const Error = styled.div`
  color: ${colors.red};
  margin-top: 15px;
  text-align: left;
`;

const Cancel: React.FC = () => {
  const { appointment } = useManageState();
  const { goToPage } = useManageDispatch();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <Container size="md">
      <Content>
        <PageHeader>
          <PageTitle>
            Are you sure you want to cancel your appointment?
          </PageTitle>
        </PageHeader>
        <Text>
          If you’d like to cancel your appointment, please click on the link
          below.
        </Text>
        <CancelBtn
          type="button"
          libraryType="primary"
          disabled={loading}
          onClick={async () => {
            setLoading(true);
            setError(null);

            try {
              if (appointment?.id) {
                await cancelAppointment(appointment.id);
                goToPage(ManagePage.CancelConfirm);
              } else {
                // @ts-ignore
                throw new Error('Appointment data is incomplete');
              }
            } catch (e) {
              setLoading(false);
              setError(e.message);
              console.error(e);
            }
          }}
        >
          {loading ? 'Cancelling...' : 'Cancel Appointment'}
        </CancelBtn>
        {error && <Error>{error}</Error>}
      </Content>
    </Container>
  );
};

export default Cancel;
