import React from 'react';
import { Formik, Form } from 'formik';
import styled from 'styled-components';

import {
  useStepsDispatch,
  useStepsState,
} from '../../provider';
import { Container, Content, PageHeader, PageTitle } from '../../../shared/components/styled';
import { states } from './states';
import { isObject } from '../../../../utils';
import { Value } from '../../../shared/models';

import FormLabel from '../../../shared/components/form/FormLabel';
import NavigationButtons from '../../../shared/components/NavigationButtons';
import Input from '../../../shared/components/form/Input';
import ZipCodeInput from './ZipCodeInput';
import Select from '../../../shared/components/form/Select';

const CityStateRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > *:first-child {
    width: 60%;
  }

  & > *:last-child {
    width: 38%;
  }
`;

const Address: React.FC = () => {
  const {
    form: { address },
  } = useStepsState();
  const { updateFormValues, goToNextStep } = useStepsDispatch();

  function updateAddressValue(name: string, value: string) {
    updateFormValues({
      address: {
        ...address,
        [name]: value,
      },
    });
  }

  return (
    <Container>
      <Content>
        <PageHeader>
          <PageTitle>What is your address?</PageTitle>
        </PageHeader>
        <Formik
          initialValues={{
            address: {
              ...address,
              state: states.find((state) => state.value === address.state),
            },
          }}
          onSubmit={(values) => {
            updateFormValues({
              address: {
                ...values.address,
                state: values.address.state?.value || null,
              },
            });
            goToNextStep();
          }}
        >
          {() => (
            <Form>
              <FormLabel label="Street address">
                <Input
                  onChange={(value) => updateAddressValue('address', value)}
                  name="address.address"
                  isRequired
                />
              </FormLabel>
              <CityStateRow>
                <FormLabel label="City">
                  <Input
                    onChange={(value) => updateAddressValue('city', value)}
                    name="address.city"
                    isRequired
                  />
                </FormLabel>
                <FormLabel label="State">
                  <Select<string>
                    name="address.state"
                    options={states}
                    onChange={(value) => updateAddressValue('state', value)}
                    validate={(value) => {
                      let error;

                      if (!value) {
                        error = 'Required field';
                      }

                      return error;
                    }}
                  />
                </FormLabel>
              </CityStateRow>
              <ZipCodeInput updateAddressValue={updateAddressValue} />
              <NavigationButtons />
            </Form>
          )}
        </Formik>
      </Content>
    </Container>
  );
};

export default Address;
