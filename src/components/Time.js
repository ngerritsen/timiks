import React from 'react';
import styled from 'styled-components';

import { formatTime } from '../helpers';

const Time = ({ ms, fontSize = 1.8 }) => {
  return (
    <span style={{ fontSize: fontSize.toFixed(1) + 'rem' }}>
      {formatTime(ms)
        .split('')
        .map(char => char === '.' ? char : <TimeNumber>{char}</TimeNumber>)}
      <Unit>s</Unit>
    </span>
  );
}

const TimeNumber = styled.span`
  display: inline-block;
  width: 0.55em;
  text-align: center;
`;

const Unit = styled.small`
  padding-left: 0.1em;
`;

export default Time;
