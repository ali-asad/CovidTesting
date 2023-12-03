import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import logo from '../../../assets/logo.png';
import haLogo from '../../../assets/ha-logo.png';
import stack from '../../../assets/stack.png';
import { Breakpoints } from '../../../dictionaries';
import { signOut } from '../../admin/api';
import { colors } from '../../../styles/colors';
import { useAdminDispatch, useAdminState } from '../../admin/provider';
import routes from '../../../routes';

interface Props {
  withoutBg?: boolean;
  isAdmin?: boolean;
}

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: ${({ withoutBg }: Props) =>
    withoutBg
      ? 'none'
      : `linear-gradient(90.13deg, #227EB3 0.18%, #55BAF3 99.96%)`};

  @media (min-width: ${Breakpoints.md}px) {
    padding: ${({ withoutBg }: Props) =>
      withoutBg ? '25px 20px 0px' : '20px 40px'};
  }

  @media (min-width: ${Breakpoints.lg}px) {
    padding: ${({ withoutBg }: Props) =>
      withoutBg ? '25px 40px 0px' : '20px 40px'};
  }
`;

export const WLLogo = styled.div`
  height: 18px;
  width: 118px;
  background: url(${logo}) no-repeat center center;
  background-size: cover;
  margin-right: 20px;

  @media (min-width: ${Breakpoints.sm}px) {
    margin: -2px 45px 0 0;
    height: 24px;
    width: 152px;
  }
`;

export const HALogo = styled.div`
  height: 24px;
  width: 95px;
  background: url(${haLogo}) no-repeat center center;
  background-size: cover;

  @media (min-width: ${Breakpoints.sm}px) {
    height: 34px;
    width: 135px;
  }
`;

export const Logos = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const Logout = styled.button`
  background: none;
  padding: 0;
  color: ${colors.white};
  border: 0;
  cursor: pointer;
`;

export const ManageAppointmentBtn = styled.button`
  background: none;
  border: 0;
  display: flex;
  align-items: center;
  color: ${colors.white};

  &:before {
    display: block;
    content: '';
    width: 18px;
    height: 12px;
    background: url(${stack}) no-repeat center center;
    background-size: cover;

    @media (min-width: 500px) {
      margin-right: 14px;
    }
  }

  span {
    display: none;

    @media (min-width: 500px) {
      display: block;
    }
  }
`;

const AdminHeaderContent: React.FC = () => {
  const { user } = useAdminState();
  const { setUser } = useAdminDispatch();

  return (
    <>
      <Logos>
        <WLLogo />
        <HALogo />
      </Logos>
      {user && (
        <Logout
          type="button"
          onClick={() => signOut().then(() => setUser(null))}
        >
          Logout
        </Logout>
      )}
    </>
  );
};

const Header: React.FC<Props> = ({ withoutBg, isAdmin }) => {
  const history = useHistory();

  return (
    <Container withoutBg={withoutBg} isAdmin={isAdmin}>
      {isAdmin ? (
        <AdminHeaderContent />
      ) : (
        <>
          <Logos>
            <WLLogo />
            <HALogo />
          </Logos>
          {window.location.pathname !== '/manage' ? (
            <ManageAppointmentBtn
              type="button"
              onClick={() => history.push(routes.manage)}
            >
              <span>Manage Appointment</span>
            </ManageAppointmentBtn>
          ) : (
            <div />
          )}
        </>
      )}
    </Container>
  );
};

export default Header;
