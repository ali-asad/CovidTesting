import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../../shared/components/styled';
import { AppointmentListItem } from '../../models';
import { cancelAppointment } from '../../../schedule/api';

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
  appt: AppointmentListItem;
}

const Cancel: React.FC<Props> = ({ appt }) => {
  const [cancelText, setCancelText] = useState('Cancel');

  if (cancelText == 'Cancel') {
    return (
      <Wrapper>
        <Button
          type="button"
          libraryType="default"
          size="sm"
          disabled={cancelText !== 'Cancel'}
          onClick={async () => {
            setCancelText('Cancel');
            try {
              if (appt.id) {
                setCancelText('Canceling ...');
                await cancelAppointment(appt.id);
                setCancelText('Canceled');
              }
            } catch (e) {
              setCancelText('Error');
              console.error(e);
            }
          }}
        >
          {cancelText}
        </Button>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <Text>{cancelText}</Text>
      </Wrapper>
    );
  }
};

export default Cancel;
