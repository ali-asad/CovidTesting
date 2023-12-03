import React from 'react';
import { Formik, Form } from 'formik';

import {
  Container,
  Content,
  PageHeader,
  PageTitle,
  SubHeaderDescription,
} from '../../shared/components/styled';
import { useStepsDispatch, useStepsState } from '../provider';

import YesNoButtonGroup from '../../shared/components/form/YesNoButtonGroup';
import NavigationButtons from '../../shared/components/NavigationButtons';
import WhyAreWeAsking from '../../shared/components/WhyAreWeAsking';

const Conditions: React.FC = () => {
  const {
    form: { hasConditions },
  } = useStepsState();
  const { updateFormValues, goToNextStep } = useStepsDispatch();

  return (
    <Container size="xl">
      <Content>
        <PageHeader>
          <PageTitle>
            Do you have chronic medical conditions that can increase the risk of
            severe COVID 19 illness?{' '}
            <WhyAreWeAsking tooltipContent="These questions are based on COVID-19 guidelines from the Centers for Disease Control and Prevention (CDC) and the World Health Organization (WHO) to remind guests of basic safety requirement and asks a few simple questions to ensure they are fit to fly. The form, which is displayed when checking in to your flight on the desktop or mobile website, and airport self-service kiosks, brings an additional layer of safety for guests and employees." />
          </PageTitle>
        </PageHeader>
        <Container noPadding>
          <SubHeaderDescription>
            Please see the{' '}
            <a
              href="https://www.cdc.gov/coronavirus/2019-ncov/need-extra-precautions/index.html"
              target="_blank"
              rel="noreferrer noopener"
            >
              CDC Guidance for People at Increased Risk for Severe Illness
            </a>
            .
          </SubHeaderDescription>
          <Formik
            initialValues={{
              hasConditions,
            }}
            onSubmit={(values) => {
              updateFormValues(values);
              goToNextStep();
            }}
          >
            {() => (
              <Form>
                <YesNoButtonGroup
                  name="hasConditions"
                  onChange={(answer) =>
                    updateFormValues({ hasConditions: answer })
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

export default Conditions;
