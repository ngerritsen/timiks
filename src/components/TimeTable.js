import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faTimes, faThumbsUp, faInfoCircle } from '@fortawesome/fontawesome-pro-solid';

import Time from './Time';
import Modal from './Modal';
import IconButton from './IconButton';
import TimeDetails from './TimeDetails';

const STATS = ['ao5', 'ao12', 'ao25', 'ao50', 'ao100', 'mo3'];

const TimeTable = ({ stats, hideTimeDetails, removeTime, showTimeDetails, times }) => (
  <div>
    {times.map(({ ms, id, best, date, scramble, showDetails, puzzle }, index) => (
      <TimeBoardRow key={index}>
        <div>
          <TimeIndex>{index + 1}.</TimeIndex>
            <Time ms={ms}/>
            {
              (best && times.length > 1) &&
              <TimeInfo>
                <BestTimeIcon><FontAwesome icon={faThumbsUp}/></BestTimeIcon>
              </TimeInfo>
            }
        </div>
        <div>
          <InfoIconButton onClick={() => showTimeDetails(id)}>
            <FontAwesome icon={faInfoCircle} size="sm" />
          </InfoIconButton>
          <Modal title="Details" isOpen={showDetails}>
            <TimeDetails puzzle={puzzle} date={date} ms={ms} scramble={scramble} hideTimeDetails={hideTimeDetails}/>
          </Modal>
          {
            removeTime &&
            <RemoveItemIconButton onClick={() => removeTime(id)}>
              <FontAwesome icon={faTimes} size="sm" />
            </RemoveItemIconButton>
          }
        </div>
      </TimeBoardRow>
    ))}
    {
      STATS
        .filter(stat => stats[stat])
        .map(stat => (
          <TimeBoardRow key={stat}>
            <div>
              <TimeIndex></TimeIndex>
              <strong><Time ms={stats[stat]}/></strong>
              <TimeInfo>({stat})</TimeInfo>
            </div>
          </TimeBoardRow>
        ))
    }
  </div>
)

TimeTable.propTypes = {
  stats: PropTypes.object.isRequired,
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
  font-size: 1.5rem;
`;

const TimeIndex = styled.span`
  display: inline-block;
  width: 2em;
  color: ${props => props.theme.colors.subtleFg};
`;

const BestTimeIcon = styled.span`
  color: ${props => props.theme.colors.green};
`;

const InfoIconButton = IconButton.extend`
  color: ${props => props.theme.colors.blue};
`;

const RemoveItemIconButton = IconButton.extend`
  margin-left: ${props => props.theme.sizes.sm};
  color: ${props => props.theme.colors.red};
`;

export default TimeTable;
