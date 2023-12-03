import React from 'react';
import styled from 'styled-components';

import { useStepsDispatch } from '../../schedule/provider';

import { Button } from './styled';

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  flex-wrap: nowrap;
  padding-top: 30px;

  @media (min-width: 450px) {
    flex-direction: row;
  }
`;

const Space = styled.div`
  height: 10px;
  width: 20px;
`;

interface Props {
  onReturnButtonClick?: () => void;
  isValid?: boolean;
  confirmBtnText?: string;
  loading?: boolean;
}

const NavigationButtons: React.FC<Props> = ({
  onReturnButtonClick,
  isValid,
  confirmBtnText,
  loading,
}) => {
  const { goToPrevStep } = useStepsDispatch();

  return (
    <Container>
      <Button
        libraryType="default"
        type="button"
        onClick={() =>
          onReturnButtonClick ? onReturnButtonClick() : goToPrevStep()
        }
      >
        Return
      </Button>
      <Space />
      <Button
        libraryType="primary"
        type="submit"
        disabled={loading || (isValid !== undefined ? !isValid : false)}
      >
        {loading ? 'Processing...' : confirmBtnText}
      </Button>
    </Container>
  );
};

NavigationButtons.defaultProps = {
  confirmBtnText: 'Save & Continue',
};

export default NavigationButtons;
