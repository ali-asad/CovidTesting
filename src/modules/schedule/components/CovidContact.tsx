import React from 'react';
import { Formik, Form } from 'formik';

import { Container, Content, PageHeader, PageTitle, SubHeaderDescription } from '../../shared/components/styled';
import { useStepsDispatch, useStepsState } from '../provider';

import YesNoButtonGroup from '../../shared/components/form/YesNoButtonGroup';
import NavigationButtons from '../../shared/components/NavigationButtons';

const CovidContact: React.FC = () => {
  const {
    form: { hadContact },
  } = useStepsState();
  const { updateFormValues, goToNextStep } = useStepsDispatch();

  return (
    <Container size="xl">
      <Content>
        <PageHeader>
          <PageTitle>
            In the past 14 days, have you had contact with someone who has
            confirmed case of COVID-19? Count any contact that lasted longer
            than 15 minutes, closer than 6 feet or 1.8 meters away?
          </PageTitle>
        </PageHeader>
        <Container noPadding>
          <SubHeaderDescription>
            Please see the{' '}
            <a
              href="https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/quarantine.html"
              target="_blank"
              rel="noreferrer noopener"
            >
              CDC Guidance on When to Quarantine
            </a>
            .
          </SubHeaderDescription>
          <Formik
            initialValues={{
              hadContact,
            }}
            onSubmit={(values) => {
              updateFormValues(values);
              goToNextStep();
            }}
          >
            {() => (
              <Form>
                <YesNoButtonGroup
                  name="hadContact"
                  onChange={(answer) =>
                    updateFormValues({ hadContact: answer })
                  }
                  isRequired
                />
                <NavigationButtons />
              </Form>
            )}
          </Formik>
        </Container>
      </Content>
    </Container>
  );
};

export default CovidContact;
