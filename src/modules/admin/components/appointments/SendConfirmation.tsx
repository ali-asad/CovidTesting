import React, { useState } from 'react';
import styled from 'styled-components';

import { Button } from '../../../shared/components/styled';
import { sendConfirmationEmail } from '../../api';

const Text = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  width: 100%;
  min-width: 1px;
`;

const Wrapper = styled.div`
  width: 80px;
`;

interface Props {
  email: string;
}

enum SendState {
  Idle,
  InProgress,
  Success,
  Error,
}

const stateToLabelMap = {
  [SendState.InProgress]: 'Sending ...',
  [SendState.Error]: 'Error',
  [SendState.Success]: 'Success',
  [SendState.Idle]: 'Send',
};

const SendConfirmation: React.FC<Props> = ({ email }) => {
  const [state, setState] = useState<SendState>(SendState.Idle);

  return (
    <Wrapper>
      {state === SendState.Idle ? (
        <Button
          type="button"
          libraryType="default"
          size="sm"
          disabled={state !== SendState.Idle}
          onClick={async () => {
            setState(SendState.InProgress);

            try {
              setState(SendState.InProgress);
              await sendConfirmationEmail([email]);
              setState(SendState.Success);
            } catch (e) {
              setState(SendState.Error);
              console.error(e);
            }
          }}
        >
          {stateToLabelMap[state]}
        </Button>
      ) : (
        <Text>{stateToLabelMap[state]}</Text>
      )}
    </Wrapper>
  );
};

export default SendConfirmation;
