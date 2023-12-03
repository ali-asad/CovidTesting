import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../styles/colors';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 25px;
  font-size: 14px;

  & > * {
    display: block;
    margin: 0 15px;
  }

  button {
    background: none;
    border: 0;
    color: ${colors.blue};
    cursor: pointer;
  }
`;

const Footer: React.FC = () => {
  return (
    <div>
      <Container>
        <a
          href="https://www.worksitelabs.com/privacy"
          target="_blank"
          rel="noreferrer noopener"
        >
          Privacy Policy
        </a>
        {window.location.pathname !== '/manage' &&
          window.location.pathname !== '/admin' && (
            <button
              type="button"
              onClick={() => (window.location.pathname = '/manage')}
            >
              Manage Appointment
            </button>
          )}
      </Container>
    </div>
  );
};

export default Footer;
