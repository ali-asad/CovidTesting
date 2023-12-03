import React from 'react';
import ReactSelect from 'react-select';
import styled from 'styled-components';
import { Field, FieldProps, FieldValidator } from 'formik';

import { ErrorText } from '../styled';
import { colors } from '../../../../styles/colors';

const Container = styled.div`
  position: relative;
`;

const Error = styled.div`
  position: absolute;
  top: 60px;
  left: 6px;
`;

interface Props<T> {
  name: string;
  validate?: FieldValidator;
  onChange?: (newValue: T) => void;
  options: { label: string; value: T }[];
}

function Select<T>({ name, onChange, validate, options }: Props<T>) {
  return (
    <Field name={name} validate={validate}>
      {({
        field: { value },
        form: { setFieldValue },
        meta: { touched, error },
      }: FieldProps) => (
        <Container>
          <ReactSelect
            hasError={touched && !!error}
            value={value}
            onChange={(selectedValue) => {
              setFieldValue(name, selectedValue);

              if (onChange) {
                onChange(selectedValue.value);
              }
            }}
            options={options}
            width="100%"
            styles={{
              container: (provided: any) => ({
                ...provided,
                width: '100%',
                marginBottom: '35px',
              }),
              control: (_: any, { selectProps: { width } }: any) => ({
                width: width,
              }),
              valueContainer: (provided: any, state: any) => ({
                ...provided,
                border: `1px solid ${
                  state.selectProps.hasError ? colors.red : colors.grey
                }`,
                borderRadius: '10px',
                padding: '12px 24px',
              }),
              indicatorSeparator: () => ({
                display: 'none',
              }),
              indicatorsContainer: (provided: any) => ({
                ...provided,
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                right: '5px',
              }),
            }}
          />
          <Error>
            <ErrorText hasError={touched && error !== undefined}>
              {error}
            </ErrorText>
          </Error>
        </Container>
      )}
    </Field>
  );
};

export default Select;
