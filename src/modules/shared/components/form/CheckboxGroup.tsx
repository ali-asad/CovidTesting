import React from 'react';
import styled from 'styled-components';
import { Field, FieldProps } from 'formik';

import { ErrorText } from '../styled';
import { useStepsDispatch } from '../../../schedule/provider';

import { NonFormikCheckbox } from './Checkbox';

const Container = styled.div`
  position: relative;
  padding-bottom: 35px;
`;

const CheckboxWrapper = styled.div``;

const Title = styled.h3`
  margin: 0 0 14px 0;
  font-size: 16px;
  line-height: 22px;
`;

const Error = styled.div`
  position: absolute;
  left: 0;
  bottom: 15px;
`;

interface Props {
  name: string;
  title: string;
  options: { label: string; value: string }[];
  isRequired?: boolean;
}

const CheckboxGroup: React.FC<Props> = ({
  name,
  title,
  options,
  isRequired,
}) => {
  const { updateFormValues } = useStepsDispatch();

  return (
    <Container>
      <Title>{title}</Title>
      <Field
        name={name}
        validate={(value: string | null) => {
          let error;

          if (isRequired && !value) {
            error = 'Please choose one answer';
          }

          return error;
        }}
      >
        {({
          field: { value },
          meta: { error, touched },
          form: { setFieldValue },
        }: FieldProps) => (
          <>
            {options.map((option) => (
              <CheckboxWrapper key={option.value}>
                <NonFormikCheckbox
                  type="radio"
                  name={name}
                  checked={value === option.value}
                  onChange={(checked) => {
                    if (checked) {
                      setFieldValue(name, option.value);
                      updateFormValues({ [name]: option.value });
                    }
                  }}
                >
                  {option.label}
                </NonFormikCheckbox>
              </CheckboxWrapper>
            ))}
            <Error>
              <ErrorText hasError={touched && error !== undefined}>
                {error}
              </ErrorText>
            </Error>
          </>
        )}
      </Field>
    </Container>
  );
};

export default CheckboxGroup;
