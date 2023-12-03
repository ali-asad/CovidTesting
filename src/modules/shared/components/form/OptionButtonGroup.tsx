import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../../styles/colors';

const Label = styled.label`
  cursor: pointer;
`;

const Input = styled.input`
  display: none;

  &:checked {
    & + span {
      &:before {
        background-color: ${colors.blue};
      }
    }
  }
`;

const Span = styled.span`
  position: relative;
  width: 16px;
  height: 16px;
  border-radius: 100%;
  border: 1px solid ${colors.blue};
  display: inline-block;
  vertical-align: middle;
  margin-right: 6px;
  margin-top: -4px;
  

  &:before {
    display: block;
    position: absolute;
    content: '';
    left: 50%;
    border-radius: 100%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    transition: background-color 0.1s ease-in;
    background-color: transparent;
  }
`;

type OptionValue = string | number;

type Option<T extends OptionValue> = {
  value: T;
  label: string;
};

interface Props<T extends OptionValue> {
  name: string;
  onChange: (newValue: string) => void;
  options: Option<T>[];
}

function OptionButtonGroup<T extends OptionValue>({
  name,
  onChange,
  options,
}: Props<T>) {
  return (
    <>
      {options.map((option) => (
        <Label key={option.value}>
          <Input
            name={name}
            value={option.value}
            type="radio"
            onChange={(e) => {
              onChange(e.target.value);
            }}
          />
          <Span />
          {option.label}
        </Label>
      ))}
    </>
  );
}

export default OptionButtonGroup;
