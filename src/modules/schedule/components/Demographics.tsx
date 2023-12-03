import React from 'react';
import { Formik, Form } from 'formik';

import {
  Container,
  Content,
  PageHeader,
  PageTitle,
  PageSubTitle,
} from '../../shared/components/styled';
import { useStepsDispatch, useStepsState } from '../provider';

import NavigationButtons from '../../shared/components/NavigationButtons';
import WhyAreWeAsking from '../../shared/components/WhyAreWeAsking';
import CheckboxGroup from '../../shared/components/form/CheckboxGroup';

export const tooltipText =
  'This information is required for result reporting to State and Local Department of Public Health to help track and trend the impact of COVID-19 on different communities. Your identity remains confidential as personally identifiable information is removed from data sets, so that the people whom the data describe remain anonymous.';

const Demographics: React.FC = () => {
  const {
    form: { sex, race, ethnicity },
  } = useStepsState();
  const { updateFormValues, goToNextStep } = useStepsDispatch();

  return (
    <Container size="md">
      <Content>
        <PageHeader>
          <PageTitle>
            Demographics
            <WhyAreWeAsking tooltipContent={tooltipText} />
          </PageTitle>
          <PageSubTitle>Please fill all of the sections below:</PageSubTitle>
        </PageHeader>
        <Formik
          initialValues={{
            sex,
            race,
            ethnicity,
          }}
          onSubmit={(values) => {
            updateFormValues(values);
            goToNextStep();
          }}
        >
          {() => (
            <Form>
              <CheckboxGroup
                name="sex"
                title="Sex (at birth)"
                options={[
                  { label: 'Female', value: 'Female' },
                  { label: 'Male', value: 'Male' },
                  {
                    label: 'Prefer not to state',
                    value: 'Prefer not to state',
                  },
                ]}
                isRequired
              />
              <CheckboxGroup
                name="race"
                title="Race"
                options={[
                  {
                    label: 'American Indian or Alaska Native',
                    value: 'American Indian or Alaska Native',
                  },
                  { label: 'Asian', value: 'Asian' },
                  {
                    label: 'Black or African American',
                    value: 'Black or African American',
                  },
                  {
                    label: 'Native Hawaiian or Other Pacific Islander',
                    value: 'Native Hawaiian or Other Pacific Islander',
                  },
                  {
                    label: 'White',
                    value: 'White',
                  },
                  {
                    label: 'Other',
                    value: 'Other',
                  },
                  {
                    label: 'Prefer not to state',
                    value: 'Prefer not to state',
                  },
                ]}
                isRequired
              />
              <CheckboxGroup
                name="ethnicity"
                title="Ethnicity"
                options={[
                  { label: 'Hispanic or Latino', value: 'Hispanic or Latino' },
                  {
                    label: 'Not Hispanic or Latino',
                    value: 'Not Hispanic or Latino',
                  },
                  {
                    label: 'Prefer not to state',
                    value: 'Prefer not to state',
                  },
                ]}
                isRequired
              />
              <NavigationButtons />
            </Form>
          )}
        </Formik>
      </Content>
    </Container>
  );
};

export default Demographics;
