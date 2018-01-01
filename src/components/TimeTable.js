import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faTimes, faThumbsUp, faInfoCircle } from '@fortawesome/fontawesome-pro-solid';

import theme from '../theme';
import Time from './Time';
import Modal from './Modal';
import IconButton from './IconButton';
import TimeDetails from './TimeDetails';

const { colors: { green, red, blue } } = theme;

const TimeTable = ({ average, averageOfBestThree, hideTimeDetails, removeTime, showTimeDetails, times }) => (
  <TimeBoardTable>
    <tbody>
      {times.map(({ ms, id, best, date, scramble, showDetails }, index) => (
        <tr key={index}>
          <TimeIndexCell>{index + 1}.</TimeIndexCell>
          <TimeBoardCell>
            <Time ms={ms}/>
            {
              (best && times.length > 1) &&
              <TimeInfo><FontAwesome style={{ color: green }} icon={faThumbsUp}/></TimeInfo>
            }
          </TimeBoardCell>
          <TimeActionCell>
            <IconButton onClick={() => showTimeDetails(id)}>
              <FontAwesome style={{ color: blue }} icon={faInfoCircle} size="lg" />
            </IconButton>
            <Modal title="Details" isOpen={showDetails}>
              <TimeDetails date={date} ms={ms} scramble={scramble} hideTimeDetails={hideTimeDetails}/>
            </Modal>
          </TimeActionCell>
          {
            removeTime &&
            <TimeActionCell >
              <IconButton onClick={() => removeTime(id)}>
                <FontAwesome style={{ color: red }} icon={faTimes} size="lg" />
              </IconButton>
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
          {removeTime && <TimeActionCell/>}
        </tr>
        {
          times.length >= 5 &&
          <tr>
            <TimeIndexCell></TimeIndexCell>
            <TimeBoardCell>
              <strong><Time ms={averageOfBestThree}/></strong>
              <TimeInfo>(avg. best 3)</TimeInfo>
            </TimeBoardCell>
            <TimeActionCell/>
            {removeTime && <TimeActionCell/>}
          </tr>
        }
    </tbody>
  </TimeBoardTable>
)

TimeTable.propTypes = {
  average: PropTypes.number.isRequired,
  averageOfBestThree: PropTypes.number.isRequired,
  hideTimeDetails: PropTypes.func.isRequired,
  removeTime: PropTypes.func,
  showTimeDetails: PropTypes.func.isRequired,
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
  padding-left: ${props => props.theme.sizes.xxs};
  padding-right: ${props => props.theme.sizes.xxs};
`;

export default TimeTable;
