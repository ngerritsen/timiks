import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { fillZeroes } from '../helpers/formatting';
import { breakUpTime } from '../helpers/time';

const Time = ({ ms }) => {
  const { minutes, seconds, milliseconds } = breakUpTime(ms);
  return (
    <span>
      {formatPart(minutes, 2)}:{formatPart(seconds, 2)}.{formatPart(milliseconds, 3)}<Unit>m</Unit>
    </span>
  );
}

function formatPart(number, minChars) {
  return monospace(fillZeroes(String(number), minChars));
}

function monospace(string) {
  return string
    .split('')
    .map((char, i) => <TimeNumber key={i}>{char}</TimeNumber>);
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
