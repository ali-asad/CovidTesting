import React from 'react';
import { Formik, Form } from 'formik';

import {
  Container,
  Content,
  PageHeader,
  PageTitle,
} from '../../shared/components/styled';
import { useStepsState, useStepsDispatch } from '../provider';

import NavigationButtons from '../../shared/components/NavigationButtons';
import LocationButtonGroup from '../../shared/components/form/LocationButtonGroup';

const Location: React.FC = () => {
  const {
    form: { location },
  } = useStepsState();
  const { goToNextStep, updateFormValues } = useStepsDispatch();

  return (
    <Container>
      <Content>
        <PageHeader>
          <PageTitle>Select a location</PageTitle>
        </PageHeader>
        <Formik
          initialValues={{
            location,
          }}
          onSubmit={(values) => {
            updateFormValues(values);
            goToNextStep();
          }}
        >
          {() => (
            <Form>
              <LocationButtonGroup />
              <NavigationButtons />
            </Form>
          )}
        </Formik>
      </Content>
    </Container>
  );
};

export default Location;
