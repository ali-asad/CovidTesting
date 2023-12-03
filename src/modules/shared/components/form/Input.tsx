import React from 'react';
import styled from 'styled-components';
import { Field, FieldProps, FieldValidator } from 'formik';

import { colors } from '../../../../styles/colors';
import { hexToRGB } from '../../../../utils';
import { ErrorText } from '../styled';

const Container = styled.div`
  position: relative;
  margin-bottom: ${({ noBottomMargin }: { noBottomMargin: any }) =>
    noBottomMargin ? '0px' : '35px'};
`;

interface InputElementProps {
  hasError: boolean;
  size?: any;
}

export const StyledInput = styled.input`
  border: 1px solid
    ${({ hasError }: InputElementProps) =>
      hasError ? colors.red : colors.grey};
  border-radius: 10px;
  font-size: 16px;
  line-height: 24px;
  padding: ${({ size }: InputElementProps) =>
    size === 'sm' ? '5px 20px' : '15px 28px'};
  transition: all 0.15s ease-in-out;
  width: 100%;

  &:focus,
  &:active {
    border: 1px solid
      ${({ hasError }: InputElementProps) =>
        hasError ? colors.red : colors.blue};
    box-shadow: 0 0 4px
      ${({ hasError }: InputElementProps) =>
        hexToRGB(hasError ? colors.red : colors.blue, 0.8)};
  }
`;

const Error = styled.div`
  position: absolute;
  top: 58px;
  left: 6px;
`;

interface Props {
  name: string;
  validate?: FieldValidator;
  onChange?: (value: string) => void;
  isRequired?: boolean;
  requiredError?: string;
  size?: 'sm' | 'md';
  noBottomMargin?: boolean;
  type?: 'password' | 'text';
}

const Input: React.FC<Props> = ({
  name,
  validate,
  onChange,
  isRequired,
  requiredError,
  size,
  noBottomMargin,
  type,
}) => {
  return (
    <Field
      name={name}
      validate={(value: string) => {
        let error;

        if (isRequired && !value) {
          error = requiredError || 'Required field';
        }

        if (validate) {
          error = validate(value);
        }

        return error;
      }}
    >
      {({ field, meta: { error, touched } }: FieldProps) => {
        const hasError = touched && error !== undefined;

        return (
          <Container noBottomMargin={noBottomMargin}>
            <StyledInput
              {...field}
              type={type}
              onChange={(e) => {
                field.onChange(e);

                if (onChange) {
                  onChange(e.target.value);
                }
              }}
              hasError={hasError}
              size={size}
            />
            <Error>
              <ErrorText hasError={hasError}>{error}</ErrorText>
            </Error>
          </Container>
        );
      }}
    </Field>
  );
};

Input.defaultProps = {
  size: 'md',
  noBottomMargin: false,
  type: 'text',
};

export default Input;
