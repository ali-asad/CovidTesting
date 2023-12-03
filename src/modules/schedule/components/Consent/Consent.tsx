import React from 'react';
import { Formik, Form } from 'formik';
import styled from 'styled-components';

import { Container, Content, PageHeader, PageTitle } from '../../../shared/components/styled';
import { colors } from '../../../../styles/colors';
import {
  useStepsDispatch,
  useStepsState,
} from '../../provider';
import { Breakpoints } from '../../../../dictionaries';

import Checkbox from '../../../shared/components/form/Checkbox';
import NavigationButtons from '../../../shared/components/NavigationButtons';
import ScrollableConsent from './ScrollableConsent';

const Info = styled.div`
  background: ${colors.blue8};
  padding: 20px 30px;
  margin-bottom: 20px;

  @media (min-width: ${Breakpoints.md}px) {
    padding: 30px 40px;
  }
`;

const InfoTitle = styled.h3`
  font-size: 16px;
  line-height: 22px;
  margin: 0 0 20px 0;
  color: ${colors.blue};
`;

const InfoContent = styled.p`
  margin: 0;
`;

const Space = styled.div`
  height: 30px;

  @media (min-width: ${Breakpoints.md}px) {
    height: 40px;
  }
`;

const Consent: React.FC = () => {
  const {
    form: { consentForTesting, hipaaConfirmed, email },
  } = useStepsState();
  const { updateFormValues, goToNextStep } = useStepsDispatch();

  return (
    <Container size="md">
      <Content>
        <PageHeader>
          <PageTitle>HIPAA & Informed Consent</PageTitle>
        </PageHeader>
        <Formik
          initialValues={{
            consentForTesting,
            hipaaConfirmed,
          }}
          onSubmit={(values) => {
            updateFormValues(values);
            goToNextStep();
          }}
        >
          {({ dirty, isValid }) => (
            <Form>
              <Info>
                <InfoTitle>HIPAA Confirmation</InfoTitle>
                <InfoContent>
                  You are entitled to keep your protected health information
                  private. Please confirm that you authorize Worksite Labs to
                  share your health information, including name, COVID-19 test
                  results, and certain demographic information with the
                  appropriate public health authorities as required by law and
                  to report your results via email at {email}, even though email
                  is not a completely secure means of communication.
                  <br />
                  <br />I understand that any disclosure of information carried
                  with it the potential for redisclosure, and once disclosed,
                  the information may not be protected by federal, state, or
                  other applicable privacy laws. I understand that if I do not
                  give my authorization, I will not receive testing service from
                  Worksite Labs. I understand that I may revoke this
                  authorization at any time in writing by emailing{' '}
                  <a href="mailto:support@worksitelabs.com">
                    support@worksitelabs.com
                  </a>{' '}
                  before I receive my test result, except to the extent that
                  action has been taken in reliance on this authorization. If
                  this authorization has not been revoked, it will terminate six
                  (6) months from the date I authorize below. I understand that
                  I have a right to receive a copy of this authorization. This
                  authorization is effective immediately upon my acknowledgement
                  below.
                </InfoContent>
              </Info>
              <Checkbox
                name="hipaaConfirmed"
                isRequired
                onChange={(checked) =>
                  updateFormValues({ hipaaConfirmed: checked })
                }
              >
                I acknowledge that I have read the statement.
              </Checkbox>
              <Space />
              <Info>
                <InfoTitle>
                  Informed consent for COVID-19 Diagnostic Testing for State of
                  Hawaii Pre-travel Testing Program
                </InfoTitle>
                <InfoContent>
                  <ScrollableConsent />
                </InfoContent>
              </Info>
              <Checkbox
                name="consentForTesting"
                isRequired
                onChange={(checked) =>
                  updateFormValues({ consentForTesting: checked })
                }
              >
                I give my consent to be tested for COVID-19.
              </Checkbox>
              <NavigationButtons
                isValid={consentForTesting && hipaaConfirmed}
              />
            </Form>
          )}
        </Formik>
      </Content>
    </Container>
  );
};

export default Consent;
