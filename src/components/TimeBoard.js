import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { formatTime, calculateAverageTime } from '../helpers';

const Timeboard = ({ times, average }) => {
  return (
    <TimeList>
      {times.map(({ time }, index) => (
        <TimeRow key={index}>
          <TimeIndex>{index + 1}.</TimeIndex> {formatTime(time)}s
        </TimeRow>
      ))}
      {
        times.length > 0 &&
        <TimeRow>
          <TimeIndex></TimeIndex> <strong>{formatTime(average)}s</strong>
        </TimeRow>
      }
    </TimeList>
  )
};

const TimeList = styled.ul`
  list-style: none;
  display: block;
  padding: 0;
  margin-bottom: ${props => props.theme.sizes.md};
`;

const TimeRow = styled.li`
  padding: ${props => props.theme.sizes.xs} 0;
  border-bottom: 1px solid ${props => props.theme.colors.grey};
  font-size: 1.8rem;
`;

const TimeIndex = styled.span`
  display: inline-block;
  width: 1.5em;
  color: ${props => props.theme.colors.subtleFg};
`;

function mapStateToProps(state) {
  return {
    times: state.timer.times,
    average: calculateAverageTime(state.timer.times)
  };
}

export default connect(mapStateToProps)(Timeboard);
