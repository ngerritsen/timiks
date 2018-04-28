import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { fillZeroes } from '../../helpers/formatting';
import { breakUpTime } from '../../helpers/time';
import { getMs } from '../../helpers/times';

const Time = ({ ms, secondsOnly, dnf, plus2 }) => {
  if (dnf) {
    return monospace('DNF');
  }

  if (secondsOnly) {
    return <span>{formatPart(Math.round(ms / 1000))}<Unit>s</Unit></span>
  }

  const { minutes, seconds, milliseconds } = breakUpTime(getMs({ ms, plus2 }));
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
  dnf: PropTypes.bool,
  plus2: PropTypes.bool,
  secondsOnly: PropTypes.bool
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
