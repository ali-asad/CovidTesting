import React, { useState } from 'react';
import styled from 'styled-components';
import { Collapse } from 'react-collapse';

import { colors } from '../../../styles/colors';

const Container = styled.div`
  margin-bottom: 5px;
`;

const Trigger = styled.button`
  background: none;
  border: 1px solid ${colors.blue50};
  color: ${colors.black};
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 22px 27px;
  cursor: pointer;
  text-align: left;
`;

const RightIcon = styled.div`
  color: ${colors.blue50};
  margin-left: 10px;
  font-weight: bold;
`;

const Content = styled.div`
  margin: 20px 0;
  
  ul {
    margin: 10px 0 0;
  }
`;

interface Props {
  title: string | React.ReactNode;
  content: string | React.ReactNode;
}

const Collapsible: React.FC<Props> = ({ title, content }) => {
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <Container>
      <Trigger type="button" onClick={() => setOpened(!opened)}>
        {title}
        <RightIcon>{opened ? '-' : '+'}</RightIcon>
      </Trigger>
      <Collapse isOpened={opened}>
        <Content>{content}</Content>
      </Collapse>
    </Container>
  );
};

export default Collapsible;
