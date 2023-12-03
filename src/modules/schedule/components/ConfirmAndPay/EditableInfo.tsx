import React, { useState } from 'react';
import styled from 'styled-components';
import { useTransition } from 'react-spring';

import { colors } from '../../../../styles/colors';
import { ReactComponent as PencilIcon } from '../../../../assets/pencil.svg';
import Input from '../../../shared/components/form/Input';
import { useStepsDispatch } from '../../provider';

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
`;

interface ButtonProps {
  isEditMode: boolean;
}

const Button = styled.button`
  position: relative;
  display: block;
  width: 36px;
  height: 36px;
  border: 0;
  background: ${({ isEditMode }: ButtonProps) =>
    isEditMode ? colors.darkBlue : colors.blue8};
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  border-radius: 100%;
  margin-right: 28px;

  svg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.15s ease-in-out;

    path {
      stroke: ${({ isEditMode }: ButtonProps) =>
        isEditMode ? colors.white : colors.darkBlue};
    }
  }
`;

const Label = styled.div`
  font-weight: bold;
  width: 175px;
`;

const Value = styled.div``;

interface Props {
  name: string;
  label: string;
  value: string;
}

const EditableInfo: React.FC<Props> = ({ name, value, label }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Container>
      <Button
        type="button"
        onClick={() => setIsEditMode(!isEditMode)}
        isEditMode={isEditMode}
      >
        <PencilIcon />
      </Button>
      <Label>{label}</Label>
      {isEditMode ? (
        <Input name={name} size="sm" noBottomMargin isRequired  />
      ) : (
        <Value>{value}</Value>
      )}
    </Container>
  );
};

export default EditableInfo;
