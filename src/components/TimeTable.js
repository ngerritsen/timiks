import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faTimes, faThumbsUp, faInfoCircle, faQuestionCircle } from '@fortawesome/fontawesome-pro-solid';

import Time from './Time';
import Modal from './Modal';
import IconButton from './IconButton';
import TimeDetails from './TimeDetails';
import Button from './Button';
import Section from './Section';

const STATS = ['ao5', 'ao12', 'ao25', 'ao50', 'ao100', 'mo3'];

const TimeTable = ({
  stats,
  showStatsInfo,
  hideStatsInfo,
  statsInfoOpen,
  hideTimeDetails,
  removeTime,
  showTimeDetails,
  times
}) => (
  <TimeTableContainer>
    <TimeTableColumn>
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
    </TimeTableColumn>
    <TimeTableColumn>
      <TimeBoardRow>
        <div>
          <TimeIndex></TimeIndex>
          Stats
        </div>
        <div>
          <QuestionIconButton onClick={showStatsInfo}>
            <FontAwesome icon={faQuestionCircle} size="sm" />
          </QuestionIconButton>
          <Modal title="Stats" isOpen={statsInfoOpen}>
            <Section margin="md">
              <p>When a minimum of 3 solves are present the mean of 3 (<strong>mo3</strong>) will be shown (best average of 3 consecutive solves).</p>

              <p>After 5 solves the average of the <i>last</i> 5 solves (without the best and the worst solve) will be shown (<strong>ao5</strong>). After that it will continue with: <strong>ao12, ao25, ao50* and ao100*</strong>.</p>

              <i>*The a50 will exclude the best and worst 3 solves, the ao100 will exclude 5.</i>
            </Section>
            <Button onClick={hideStatsInfo}>Close</Button>
          </Modal>
        </div>
      </TimeBoardRow>
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
    </TimeTableColumn>
  </TimeTableContainer>
)

TimeTable.propTypes = {
  stats: PropTypes.object.isRequired,
  showStatsInfo: PropTypes.func.isRequired,
  hideStatsInfo: PropTypes.func.isRequired,
  statsInfoOpen: PropTypes.bool.isRequired,
  hideTimeDetails: PropTypes.func.isRequired,
  removeTime: PropTypes.func,
  showTimeDetails: PropTypes.func.isRequired,
  times: PropTypes.arrayOf(PropTypes.object).isRequired
};

const TimeTableContainer = styled.div`
  @media screen and (min-width: 414px) {
    display: flex;
  }
`;

const TimeTableColumn = styled.div`
  @media screen and (min-width: 414px) {
    width: 50%;
  }
}
`;

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

const QuestionIconButton = IconButton.extend`
  color: ${props => props.theme.colors.blue};
  margin-left: ${props => props.theme.sizes.xs};
`;

const RemoveItemIconButton = IconButton.extend`
  margin-left: ${props => props.theme.sizes.sm};
  color: ${props => props.theme.colors.red};
`;

export default TimeTable;
