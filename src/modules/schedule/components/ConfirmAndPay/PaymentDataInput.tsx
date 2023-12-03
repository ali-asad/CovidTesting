import React from 'react';
import styled from 'styled-components';
import { Field, FieldProps } from 'formik';

import { colors } from '../../../../styles/colors';

const Container = styled.div`
  border-bottom: 1px solid ${colors.grey20};
  padding: 10px 20px 10px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;

  &:last-child {
    border-bottom: 0;
  }
`;

const Label = styled.div`
  color: ${({ hasError }: { hasError: boolean }) =>
    hasError ? colors.red : colors.grey};
  transition: color 0.15s ease-in-out;
  width: 90px;
`;

const Input = styled.input`
  width: 100%;
  border: 0;
`;

interface Props {
  name: string;
  label: string;
}

const PaymentDataInput: React.FC<Props> = ({ name, label }) => {
  return (
    <Field
      name={name}
      validate={(value: string) => {
        let error;

        if (!value) {
          error = 'Required field';
        }

        return error;
      }}
    >
      {({ field, meta: { touched, error } }: FieldProps) => (
        <Container>
          <Label hasError={touched && error !== undefined}>{label}</Label>
          <Input {...field} />
        </Container>
      )}
    </Field>
  );
};

export default PaymentDataInput;
