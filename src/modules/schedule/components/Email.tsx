import React from 'react';
import { Formik, Form, FormikErrors, FormikValues } from 'formik';

import { Container, Content, PageTitle, PageHeader } from '../../shared/components/styled';
import { useStepsDispatch, useStepsState } from '../provider';
import { isValidEmail } from '../../../validations';

import NavigationButtons from '../../shared/components/NavigationButtons';
import Input from '../../shared/components/form/Input';
import FormLabel from '../../shared/components/form/FormLabel';

const Email: React.FC = () => {
  const {
    form: { email, confirmEmail },
  } = useStepsState();
  const { updateFormValues, goToNextStep } = useStepsDispatch();

  return (
    <Container>
      <Content>
        <PageHeader>
          <PageTitle>What is your email</PageTitle>
        </PageHeader>
        <Formik
          initialValues={{
            email,
            confirmEmail,
          }}
          onSubmit={(values) => {
            updateFormValues(values);
            goToNextStep();
          }}
          validate={(values) => {
            const errors: FormikErrors<FormikValues> = {};

            if (values.email !== values.confirmEmail) {
              errors.confirmEmail = 'Entered emails do not match';
            }

            return errors;
          }}
        >
          {() => (
            <Form>
              <FormLabel label="Email">
                <Input
                  name="email"
                  onChange={(value) => updateFormValues({ email: value })}
                  validate={(value) => {
                    let error;

                    if (!isValidEmail.test(value)) {
                      error = 'Please enter valid email address';
                    }

                    if (value === '') {
                      error = 'Required field';
                    }

                    return error;
                  }}
                />
              </FormLabel>
              <FormLabel label="Confirm email">
                <Input name="confirmEmail" />
              </FormLabel>
              <NavigationButtons />
            </Form>
          )}
        </Formik>
      </Content>
    </Container>
  );
};

export default Email;
