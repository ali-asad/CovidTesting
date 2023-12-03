import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import styled from 'styled-components';
import { differenceInYears, format, parse } from 'date-fns';

import { Container, Content, PageHeader, PageTitle } from '../../../shared/components/styled';
import { useStepsDispatch, useStepsState, newMinor } from '../../provider';
import { Breakpoints } from '../../../../dictionaries';
import { config } from '../../../../config';

import NavigationButtons from '../../../shared/components/NavigationButtons';
import FormLabel from '../../../shared/components/form/FormLabel';
import Input from '../../../shared/components/form/Input';
import { DatepickerField } from '../../../shared/components/Datepicker';
import Checkbox from '../../../shared/components/form/Checkbox';
import Minors from './Minors';

const InputRow = styled.div`
  display: flex;
  flex-direction: column;
  margin: -8px 0;

  @media (min-width: ${Breakpoints.sm}px) {
    flex-direction: row;
    margin: 0 -8px;
  }

  @media (min-width: ${Breakpoints.lg}px) {
    margin: 0 -15px;
  }

  & > * {
    flex-basis: 33%;
    margin: 8px 0;

    @media (min-width: ${Breakpoints.sm}px) {
      margin: 0 8px;
    }

    @media (min-width: ${Breakpoints.lg}px) {
      margin: 0 15px;
    }
  }
`;

const PersonalInformation: React.FC = () => {
  const {
    form: { minors, firstName, lastName, birthDate },
  } = useStepsState();
  const { updateFormValues, goToNextStep } = useStepsDispatch();
  const [hasMinors, setHasMinors] = useState(minors.length > 0);

  return (
    <Container size="xl">
      <Content>
        <PageHeader>
          <PageTitle>Enter your information</PageTitle>
        </PageHeader>
        <Formik
          initialValues={{
            minors: minors.map((minor) => ({
              ...minor,
              birthDate:
                minor.birthDate &&
                parse(minor.birthDate, config.dateFormat, new Date()),
            })),
            firstName,
            lastName,
            birthDate:
              birthDate && parse(birthDate, config.dateFormat, new Date()),
            hasMinors,
          }}
          onSubmit={(values) => {
            updateFormValues({
              ...values,
              birthDate:
                values.birthDate && format(values.birthDate, config.dateFormat),
              minors: values.minors.map((minor) => ({
                ...minor,
                birthDate:
                  minor.birthDate && format(minor.birthDate, config.dateFormat),
              })),
            });
            goToNextStep();
          }}
        >
          {({ setFieldValue }) => {
            return (
              <Form>
                <InputRow>
                  <FormLabel label="First Name">
                    <Input
                      name="firstName"
                      isRequired
                      onChange={(value) =>
                        updateFormValues({ firstName: value })
                      }
                    />
                  </FormLabel>
                  <FormLabel label="Last Name">
                    <Input
                      name="lastName"
                      isRequired
                      onChange={(value) =>
                        updateFormValues({ lastName: value })
                      }
                    />
                  </FormLabel>
                  <FormLabel label="Date of Birth">
                    <DatepickerField
                      name="birthDate"
                      inputPlaceholder="MM/DD/YYYY"
                      validate={(value) => {
                        let error;

                        if (differenceInYears(new Date(), value) < 18) {
                          error = 'You must be 18 years old or above';
                        }

                        return error;
                      }}
                    />
                  </FormLabel>
                </InputRow>
                <Checkbox
                  name="hasMinors"
                  onChange={(checked) => {
                    const newMinors = checked ? [newMinor] : [];
                    setFieldValue('minors', newMinors);
                    updateFormValues({ minors: newMinors });
                    setHasMinors(checked);
                  }}
                >
                  I am registering for minors.
                </Checkbox>
                {hasMinors && <Minors />}
                <NavigationButtons />
              </Form>
            );
          }}
        </Formik>
      </Content>
    </Container>
  );
};

export default PersonalInformation;
