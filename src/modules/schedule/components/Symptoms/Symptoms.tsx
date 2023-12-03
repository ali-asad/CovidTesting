import React from 'react';
import { Formik, Form, FormikErrors, FormikValues } from 'formik';
import styled from 'styled-components';

import {
  Container,
  Content,
  PageHeader,
  PageTitle,
  SubHeaderDescription,
} from '../../../shared/components/styled';
import {
  useStepsDispatch,
  useStepsState,
} from '../../provider';
import { colors } from '../../../../styles/colors';

import YesNoButtonGroup from '../../../shared/components/form/YesNoButtonGroup';
import NavigationButtons from '../../../shared/components/NavigationButtons';
import SymptomsCheckboxes from './SymptomsCheckboxes';

const InfoContainer = styled.div`
  background: ${colors.blue8};
  padding: 20px;

  h3 {
    margin-bottom: 15px;
  }

  p {
    margin-bottom: 15px;
  }
  
  i {
    font-size: 15px;
  }
  
  strong {
    font-weight: 600;
  }
`;

const Symptoms: React.FC = () => {
  const {
    form: { symptoms, hasSymptoms },
  } = useStepsState();
  const { updateFormValues, goToNextStep } = useStepsDispatch();

  return (
    <Container>
      <Content>
        <PageHeader>
          <PageTitle>Do you have any of the following symptoms?</PageTitle>
        </PageHeader>
        <SubHeaderDescription>
          Please see the{' '}
          <a
            href="https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/coronavirus-self-checker.html"
            target="_blank"
            rel="noreferrer noopener"
          >
            CDC Coronavirus Self-Checker
          </a>{' '}
          for more information.
        </SubHeaderDescription>
        <Formik
          initialValues={{
            hasSymptoms,
            symptoms,
          }}
          onSubmit={(values) => {
            updateFormValues(values);
            goToNextStep();
          }}
          validate={(values) => {
            const errors: FormikErrors<FormikValues> = {};

            if (values.hasSymptoms && values.symptoms.length === 0) {
              errors.hasSymptoms = 'Please choose at least one symptom';
            }

            return errors;
          }}
        >
          {({ values, setFieldValue }) => {
            return (
              <Form>
                <YesNoButtonGroup
                  name="hasSymptoms"
                  onChange={(answer) => {
                    updateFormValues({ isParentOrGuardian: answer });

                    if (!answer && values.symptoms.length > 0) {
                      updateFormValues({ symptoms: [] });
                      setFieldValue('symptoms', []);
                    }
                  }}
                  additionalContent={<SymptomsCheckboxes />}
                />
                <InfoContainer>
                  <h3>When to seek emergency medical attention</h3>
                  <p>
                    Look for <strong>emergency warning signs*</strong> for
                    COVID-19. If someone is showing any of these signs,{' '}
                    <strong>seek emergency medical care immediately</strong>:
                  </p>
                  <ul>
                    <li>Trouble breathing</li>
                    <li>Persistent pain or pressure in the chest</li>
                    <li>New confusion</li>
                    <li>Inability to wake or stay awake</li>
                    <li>Bluish lips or face</li>
                  </ul>
                  <p>
                    <i>
                      *This list is not all possible symptoms. Please call your
                      medical provider for any other symptoms that are severe or
                      concerning to you.
                    </i>
                  </p>
                  <p>
                    <strong>
                      Call 911 or call ahead to your local emergency facility:
                    </strong>{' '}
                    Notify the operator that you are seeking care for someone
                    who has or may have COVID-19.
                  </p>
                </InfoContainer>
                <NavigationButtons />
              </Form>
            );
          }}
        </Formik>
      </Content>
    </Container>
  );
};

export default Symptoms;
