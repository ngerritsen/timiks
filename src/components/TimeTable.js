import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Time from './Time';

const TimeTable = ({ average, removeTime, times }) => (
  <TimeBoardTable>
    <tbody>
      {times.map(({ ms, id, best }, index) => (
        <tr key={index}>
          <TimeIndexCell>{index + 1}.</TimeIndexCell>
          <TimeBoardCell>
            <Time ms={ms}/>
            {(best && times.length > 1) && <TimeInfo>👍</TimeInfo>}
          </TimeBoardCell>
          <TimeActionCell onClick={() => removeTime(id)}>❌</TimeActionCell>
        </tr>
      ))}
        <tr>
          <TimeIndexCell></TimeIndexCell>
          <TimeBoardCell>
            <strong><Time ms={average}/></strong>
            <TimeInfo>(avg.)</TimeInfo>
          </TimeBoardCell>
          <TimeActionCell/>
        </tr>
    </tbody>
  </TimeBoardTable>
)

TimeTable.propTypes = {
  average: PropTypes.number.isRequired,
  removeTime: PropTypes.func.isRequired,
  times: PropTypes.arrayOf(PropTypes.object).isRequired
};

const TimeBoardTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TimeInfo = styled.small`
  padding-left: 0.5em;
  color: ${props => props.theme.colors.subtleFg};
`;

const TimeBoardCell = styled.td`
  font-size: 1.8rem;
  padding: ${props => props.theme.sizes.xs} 0;
  border-bottom: 1px solid ${props => props.theme.colors.grey};
`;

const TimeIndexCell = TimeBoardCell.extend`
  width: 2em;
  color: ${props => props.theme.colors.subtleFg};
`;

const TimeActionCell = TimeBoardCell.extend`
  font-size: 1rem;
  width: 2em;
  opacity: 0.8;
  padding-left: ${props => props.theme.sizes.xxs};
  padding-right: ${props => props.theme.sizes.xxs};

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

export default TimeTable;
