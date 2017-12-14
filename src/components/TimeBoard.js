import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Time from './Time';
import { calculateAverageTime } from '../helpers';

const Timeboard = ({ times, average }) => {
  return (
    <TimeList>
      {times.map(({ time }, index) => (
        <TimeRow key={index}>
          <TimeIndex>{index + 1}.</TimeIndex> <Time ms={time}/>
        </TimeRow>
      ))}
      {
        times.length > 0 &&
        <TimeRow>
          <TimeIndex></TimeIndex>
          <strong> <Time ms={average}/></strong>
          <TimeInfo>(avg.)</TimeInfo>
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

const TimeInfo = styled.small`
  padding-left: 0.5em;
  color: ${props => props.theme.colors.subtleFg};
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
