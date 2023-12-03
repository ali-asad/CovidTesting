import React from 'react';
import styled from 'styled-components';
import { Tooltip } from 'react-tippy';

import questionInCircle from '../../../assets/question-in-circle.svg';
import { colors } from '../../../styles/colors';

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  position: relative;
  top: 4px;
  margin-left: 6px;
`;

const QuestionMark = styled.div`
  width: 24px;
  height: 24px;
  background: url(${questionInCircle}) no-repeat center center;
  margin-right: 3px;
`;

const Text = styled.span`
  color: ${colors.darkBlue};
  font-size: 16px;
  font-weight: normal;
`;

interface Props {
  tooltipContent: string;
}

const WhyAreWeAsking: React.FC<Props> = ({ tooltipContent }) => {
  return (
    <Container>
      <QuestionMark />
      <Tooltip
        title={tooltipContent}
        animation="fade"
        arrow={true}
        style={{
          lineHeight: '24px',
        }}
      >
        <Text>Why are we asking for this?</Text>
      </Tooltip>
    </Container>
  );
};

export default WhyAreWeAsking;
