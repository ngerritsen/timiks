import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { formatTime } from '../helpers/formatting';

const Time = ({ ms, fontSize, decimals }) => {
  return (
    <span style={{ fontSize: fontSize ? (fontSize.toFixed(1) + 'rem') : 'inherit' }}>
      {formatTime(ms, decimals)
        .split('')
        .map((char, i) => char === '.' ? char : <TimeNumber key={i}>{char}</TimeNumber>)}
      <Unit>s</Unit>
    </span>
  );
}

Time.propTypes = {
  ms: PropTypes.number.isRequired,
  decimals: PropTypes.number,
  fontSize: PropTypes.number
};

const TimeNumber = styled.span`
  display: inline-block;
  width: 0.55em;
  text-align: center;
`;

const Unit = styled.small`
  padding-left: 0.1em;
`;

export default Time;
