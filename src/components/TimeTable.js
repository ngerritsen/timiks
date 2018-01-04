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
  <div>
    {times.map(({ ms, id, best, date, scramble, showDetails }, index) => (
      <TimeBoardRow key={index}>
        <div>
          <TimeIndex>{index + 1}.</TimeIndex>
            <Time ms={ms}/>
            {
              (best && times.length > 1) &&
              <TimeInfo><FontAwesome style={{ color: green }} icon={faThumbsUp}/></TimeInfo>
            }
        </div>
        <div>
          <IconButton onClick={() => showTimeDetails(id)}>
            <FontAwesome style={{ color: blue }} icon={faInfoCircle} size="sm" />
          </IconButton>
          <Modal title="Details" isOpen={showDetails}>
            <TimeDetails date={date} ms={ms} scramble={scramble} hideTimeDetails={hideTimeDetails}/>
          </Modal>
          {
            removeTime &&
            <RemoveItemIconButton onClick={() => removeTime(id)}>
              <FontAwesome style={{ color: red }} icon={faTimes} size="sm" />
            </RemoveItemIconButton>
          }
        </div>
      </TimeBoardRow>
    ))}
      <TimeBoardRow>
        <div>
          <TimeIndex></TimeIndex>
          <strong><Time ms={average}/></strong>
          <TimeInfo>(avg.)</TimeInfo>
        </div>
      </TimeBoardRow>
      {
        times.length >= 5 &&
        <TimeBoardRow>
          <div>
            <TimeIndex></TimeIndex>
            <strong><Time ms={averageOfBestThree}/></strong>
            <TimeInfo>(avg. best 3)</TimeInfo>
          </div>
        </TimeBoardRow>
      }
  </div>
)

TimeTable.propTypes = {
  average: PropTypes.number.isRequired,
  averageOfBestThree: PropTypes.number.isRequired,
  hideTimeDetails: PropTypes.func.isRequired,
  removeTime: PropTypes.func,
  showTimeDetails: PropTypes.func.isRequired,
  times: PropTypes.arrayOf(PropTypes.object).isRequired
};

const TimeBoardRow = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid ${props => props.theme.colors.grey};
  justify-content: space-between;
  align-items: center;
  height: 3.6rem;
`;

const TimeInfo = styled.small`
  padding-left: ${props => props.theme.sizes.xs};
  color: ${props => props.theme.colors.subtleFg};
`;

const TimeIndex = styled.span`
  display: inline-block;
  width: 2em;
  color: ${props => props.theme.colors.subtleFg};
`;

const RemoveItemIconButton = IconButton.extend`
  margin-left: ${props => props.theme.sizes.xs};
`;

export default TimeTable;
