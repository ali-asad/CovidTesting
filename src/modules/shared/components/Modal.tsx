import React from 'react';
import { Modal as ReactResponsiveModal } from 'react-responsive-modal';
import styled from 'styled-components';

import { Breakpoints } from '../../../dictionaries';

interface BodyProps {
  noPadding?: boolean;
}

const Body = styled.div`
  padding: ${({ noPadding }: BodyProps) => (noPadding ? '0px' : '20px')};
  min-width: 100%;

  @media (min-width: ${Breakpoints.md}px) {
    padding: ${({ noPadding }: BodyProps) => (noPadding ? '0px' : '32px')};
  }
`;

interface Props {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  noPadding?: boolean;
  maxWidth?: number;
}

const Modal: React.FC<Props> = ({
  children,
  open,
  onClose,
  noPadding,
  maxWidth,
}) => {
  return (
    <ReactResponsiveModal
      open={open}
      onClose={onClose}
      styles={{
        modal: {
          borderRadius: '3px',
          padding: '0px',
          maxWidth: `${maxWidth || 604}px`,
          overflow: 'hidden',
          width: '100%',
        },
        closeIcon: {
          display: 'none',
        },
      }}
      animationDuration={250}
      center
    >
      <Body noPadding={noPadding}>{children}</Body>
    </ReactResponsiveModal>
  );
};

export default Modal;
