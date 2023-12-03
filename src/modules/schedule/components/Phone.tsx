import React, { useState } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';

import { Container, Content, PageTitle, PageHeader } from '../../shared/components/styled';
import { useStepsDispatch, useStepsState } from '../provider';
import { isUSPhone } from '../../../validations';

import NavigationButtons from '../../shared/components/NavigationButtons';
import Input from '../../shared/components/form/Input';
import Checkbox from '../../shared/components/form/Checkbox';

const Disclaimer = styled.p`
  font-size: 14px;
  margin: 30px 0 0;
  text-align: center;
`;

const Phone: React.FC = () => {
  const {
    form: { phone, sendMessagesAboutTestResults },
  } = useStepsState();
  const { updateFormValues, goToNextStep } = useStepsDispatch();
  const [dirty, setDirty] = useState(!!phone && sendMessagesAboutTestResults);

  return (
    <Container>
      <Content>
        <PageHeader>
          <PageTitle>What is your phone number</PageTitle>
        </PageHeader>
        <Formik
          initialValues={{
            phone,
            sendMessagesAboutTestResults,
          }}
          onSubmit={(values) => {
            updateFormValues(values);
            goToNextStep();
          }}
          enableReinitialize={false}
        >
          {({ isValid }) => (
            <Form>
              <Input
                name="phone"
                onChange={(value) => {
                  updateFormValues({ phone: value });

                  if (!dirty) {
                    setDirty(true);
                  }
                }}
                validate={(value) => {
                  let error;

                  if (!isUSPhone.test(value)) {
                    error = 'Please enter valid US phone number';
                  }

                  if (value === '') {
                    error = 'Required field';
                  }

                  return error;
                }}
              />
              <Checkbox
                name="sendMessagesAboutTestResults"
                onChange={(checked) => {
                  updateFormValues({ sendMessagesAboutTestResults: checked });

                  if (!dirty) {
                    setDirty(true);
                  }
                }}
                isRequired
              >
                Please check this box to consent to receiving text messages
                about your test results.
              </Checkbox>
              <NavigationButtons isValid={dirty && isValid} />
            </Form>
          )}
        </Formik>
        <Disclaimer>
          Text message frequency varies. Message and data rates may apply.
        </Disclaimer>
      </Content>
    </Container>
  );
};

export default Phone;
