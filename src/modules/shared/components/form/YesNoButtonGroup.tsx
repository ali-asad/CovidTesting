import React from 'react';
import { Field, FieldProps } from 'formik';
import styled from 'styled-components';

import { colors } from '../../../../styles/colors';
import { ErrorText } from '../styled';

interface ButtonProps {
  selected: boolean;
}

const Container = styled.div`
  position: relative;
  padding-bottom: 10px;
`;

const Error = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
`;

const Button = styled.button`
  border: 1px solid ${colors.blue};
  background-color: ${({ selected }: ButtonProps) =>
    selected ? colors.blue : colors.white};
  color: ${({ selected }: ButtonProps) =>
    selected ? colors.white : colors.blue};
  font-weight: bold;
  font-size: 24px;
  line-height: 36px;
  display: block;
  width: 100%;
  padding: 10px 20px;
  margin-bottom: 15px;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
`;

interface Props {
  name: string;
  onChange?: (answer: boolean) => void;
  isRequired?: boolean;
  additionalContent?: React.ReactNode;
}

const YesNoButtonGroup: React.FC<Props> = ({
  name,
  onChange,
  isRequired,
  additionalContent,
}) => {
  return (
    <Field
      name={name}
      validate={(value: boolean | null) => {
        let error;

        if (isRequired && value === null) {
          error = 'Please choose one of the answers';
        }

        return error;
      }}
    >
      {({
        field: { value },
        form: { setFieldValue },
        meta: { touched, error },
      }: FieldProps) => (
        <Container>
          <Button
            type="button"
            selected={value === true}
            onClick={() => {
              setFieldValue(name, true);

              if (onChange) {
                onChange(true);
              }
            }}
          >
            Yes
          </Button>
          {additionalContent || null}
          <Button
            type="button"
            selected={value === false}
            onClick={() => {
              setFieldValue(name, false);

              if (onChange) {
                onChange(false);
              }
            }}
          >
            No
          </Button>
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

YesNoButtonGroup.defaultProps = {
  isRequired: true,
};

export default YesNoButtonGroup;
