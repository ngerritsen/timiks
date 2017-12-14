import React from 'react';
import styled from 'styled-components';

import { formatTime } from '../helpers';

const Time = ({ ms }) => {
  return (
    <StyledTime>
      {formatTime(ms)
        .split('')
        .map(char => char === '.' ? char : <TimeNumber>{char}</TimeNumber>)}
      <small>s</small>
    </StyledTime>
  );
}

const StyledTime = styled.p`
  margin: 0 0 ${props => props.theme.sizes.xl};
  padding: ${props => props.theme.sizes.sm} 0;
  text-align: center;
  font-size: 6.2rem;
`;

const TimeNumber = styled.span`
  display: inline-block;
  width: 0.5em;
  text-align: center;
`

export default Time;
