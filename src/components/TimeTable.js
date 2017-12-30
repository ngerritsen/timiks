import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faTimes, faThumbsUp } from '@fortawesome/fontawesome-pro-solid';

import theme from '../theme';
import Time from './Time';

const { colors: { green, red } } = theme;

const TimeTable = ({ average, averageOfBestThree, removeTime, times }) => (
  <TimeBoardTable>
    <tbody>
      {times.map(({ ms, id, best }, index) => (
        <tr key={index}>
          <TimeIndexCell>{index + 1}.</TimeIndexCell>
          <TimeBoardCell>
            <Time ms={ms}/>
            {
              (best && times.length > 1) &&
              <TimeInfo><FontAwesome style={{ color: green }} icon={faThumbsUp}/></TimeInfo>
            }
          </TimeBoardCell>

          {
            removeTime &&
            <TimeActionCell onClick={() => removeTime(id)}>
              <FontAwesome style={{ color: red }} icon={faTimes} size="lg" />
            </TimeActionCell>
          }
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
        {
          times.length >= 5 &&
          <tr>
            <TimeIndexCell></TimeIndexCell>
            <TimeBoardCell>
              <strong><Time ms={averageOfBestThree}/></strong>
              <TimeInfo>(avg. best 3)</TimeInfo>
            </TimeBoardCell>
            {removeTime && <TimeActionCell/>}
          </tr>
        }
    </tbody>
  </TimeBoardTable>
)

TimeTable.propTypes = {
  average: PropTypes.number.isRequired,
  averageOfBestThree: PropTypes.number.isRequired,
  removeTime: PropTypes.func,
  times: PropTypes.arrayOf(PropTypes.object).isRequired
};

const TimeBoardTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TimeInfo = styled.small`
  padding-left: ${props => props.theme.sizes.xs};
  color: ${props => props.theme.colors.subtleFg};
`;

const TimeBoardCell = styled.td`
  font-size: 1.6rem;
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
