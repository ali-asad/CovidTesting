import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  
`;

const Label = styled.div`
   font-size: 12px;
   line-height: 32px;
   margin-bottom: 3px;
`;

interface Props {
  label: string;
  children: React.ReactNode;
}

const FormLabel: React.FC<Props> = ({ label, children }) => {
  return (
    <Container>
      <Label>
        {label}
      </Label>
      {children}
    </Container>
  )
}

export default FormLabel;