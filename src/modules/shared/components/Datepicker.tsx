import React, { useState, useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import styled from 'styled-components';
import { parse, isValid } from 'date-fns';
import { FieldValidator, Field, FieldProps } from 'formik';

import chevronRight from '../../../assets/chevron-right.svg';
import chevronLeft from '../../../assets/chevron-left.svg';
import calendar from '../../../assets/calendar.svg';
import { colors } from '../../../styles/colors';
import { StyledInput } from './form/Input';
import { ErrorText } from './styled';
import { config } from '../../../config';

const Container = styled.div`
  &.react-datepicker-inline {
    .react-datepicker {
      border: 0;
    }
  }

  .react-datepicker-popper[data-placement^='bottom']
    .react-datepicker__triangle {
    border-bottom-color: ${colors.white};
  }

  .react-datepicker {
    font-weight: normal;
    line-height: 1.375;
    border-radius: 0;
  }

  .react-datepicker-popper[data-placement^='bottom']
    .react-datepicker__triangle,
  .react-datepicker-popper[data-placement^='top'] .react-datepicker__triangle,
  .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__month-read-view--down-arrow,
  .react-datepicker__month-year-read-view--down-arrow,
  .react-datepicker-popper[data-placement^='bottom']
    .react-datepicker__triangle::before,
  .react-datepicker-popper[data-placement^='top']
    .react-datepicker__triangle::before,
  .react-datepicker__year-read-view--down-arrow::before,
  .react-datepicker__month-read-view--down-arrow::before,
  .react-datepicker__month-year-read-view--down-arrow::before {
    width: 0;
  }

  .react-datepicker__triangle {
    border-top-color: ${colors.white};
  }

  .react-datepicker__header {
    background-color: transparent;
    border-bottom: 0;
    padding-top: 11px;
  }

  .react-datepicker__navigation--previous,
  .react-datepicker__navigation--next {
    width: 28px;
    height: 28px;
    top: 7px;
    border: 0;
  }

  .react-datepicker__current-month {
    margin-bottom: 6px;
  }

  .react-datepicker__current-month,
  .react-datepicker-time__header,
  .react-datepicker-year-header {
    font-weight: normal;
  }

  .react-datepicker__navigation--previous {
    border-right-color: transparent;
    background: url(${chevronLeft}) no-repeat;
  }

  .react-datepicker__navigation--next {
    border-left-color: transparent;
    background: url(${chevronRight}) no-repeat;
  }

  .react-datepicker__day-names {
    font-size: 10px;
    text-transform: uppercase;
    font-weight: bold;
  }

  .react-datepicker__day--selected {
    border-radius: 100%;
    background-color: ${colors.blue};
  }

  .react-datepicker__day {
    &:hover {
      border-radius: 100%;
    }

    &:focus {
      outline: none;
    }
  }

  .react-datepicker__day--keyboard-selected {
    border-radius: 100%;
    background-color: transparent;
    color: #000;
  }
`;

const DatePickerWrapper = styled.div`
  .react-datepicker-wrapper {
    width: 100%;
  }
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 35px;

  &:after {
    position: absolute;
    display: block;
    content: '';
    width: 40px;
    height: 40px;
    right: 10px;
    opacity: 0.5;
    top: 8px;
    background-image: url(${calendar});
    background-size: cover;
  }
`;

const Error = styled.div`
  position: absolute;
  left: 6px;
  top: 58px;
`;

interface Props {
  onChange: (date: Date) => void;
  value: Date;
  inline?: boolean;
  customInput?: React.ReactNode;
  maxDate?: Date;
  minDate?: Date;
  showTimeSelect?: boolean;
}

const Datepicker: React.FC<Props> = ({
  onChange,
  value,
  inline,
  customInput,
  maxDate,
  minDate,
  showTimeSelect,
}) => {
  return (
    <Container className={inline ? 'react-datepicker-inline' : ''}>
      <ReactDatePicker
        selected={value}
        onChange={onChange}
        dateFormat={showTimeSelect ? config.dateTimeFormat : config.dateFormat}
        inline={inline}
        maxDate={maxDate}
        minDate={minDate}
        showTimeSelect={showTimeSelect}
        formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 3)}
        customInput={customInput}
        popperModifiers={{
          preventOverflow: {
            enabled: true,
          },
        }}
      />
    </Container>
  );
};

interface DatepickerFieldProps {
  name: string;
  onChange?: (date: Date) => void;
  validate?: FieldValidator;
  maxDate?: Date;
  minDate?: Date;
  showTimeSelect?: boolean;
  inputPlaceholder?: string;
}

const CustomInput = ({
  value,
  onChange,
  hasError,
  onClick,
  error,
  inputPlaceholder,
}: any) => {
  const [draft, setDraft] = useState(value);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused) {
      setDraft(value);
    }
  }, [value]);

  return (
    <InputContainer>
      <StyledInput
        hasError={hasError}
        onChange={(e) => {
          setDraft(e.target.value);

          const parsedDate = parse(
            e.target.value,
            config.dateFormat,
            new Date()
          );

          if (isValid(parsedDate)) {
            onChange(e);
          }
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          setDraft(value);
        }}
        value={draft}
        placeholder={inputPlaceholder}
        onClick={onClick}
      />
      <Error>
        <ErrorText hasError={hasError}>{error}</ErrorText>
      </Error>
    </InputContainer>
  );
};

export const DatepickerField: React.FC<DatepickerFieldProps> = ({
  name,
  onChange,
  validate,
  maxDate,
  minDate,
  showTimeSelect,
  inputPlaceholder,
}) => {
  return (
    <Field
      name={name}
      validate={(value: Date | null) => {
        let error;

        if (validate) {
          error = validate(value);
        }

        if (!value) {
          error = 'Required field';
        }

        return error;
      }}
    >
      {({
        field,
        form: { setFieldValue },
        meta: { error, touched },
      }: FieldProps) => {
        const hasError = touched && error !== undefined;

        return (
          <DatePickerWrapper>
            <Datepicker
              onChange={(value: Date) => {
                setFieldValue(name, value);

                if (onChange) {
                  onChange(value);
                }
              }}
              value={field.value}
              minDate={minDate}
              maxDate={maxDate}
              showTimeSelect={showTimeSelect}
              customInput={
                <CustomInput
                  hasError={hasError}
                  error={error}
                  inputPlaceholder={inputPlaceholder}
                />
              }
            />
          </DatePickerWrapper>
        );
      }}
    </Field>
  );
};

export default Datepicker;
