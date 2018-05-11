import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faTimes, faThumbsUp, faInfoCircle, faQuestionCircle } from '@fortawesome/fontawesome-pro-solid';

import Time from './shared/Time';
import TimeGraph from './TimeGraph';
import Modal from './shared/Modal';
import IconButton from './shared/IconButton';
import TimeDetails from './TimeDetails';
import Button from './shared/Button';
import Section from './shared/Section';

const STATS = ['ao5', 'ao12', 'ao25', 'ao50', 'ao100', 'mo3'];

const TimeTable = ({
  stats,
  editable = true,
  showStatsInfo,
  hideStatsInfo,
  statsInfoOpen,
  hideTimeDetails,
  removeTime,
  showTimeDetails,
  times
}) => {
  const noDnfTimes = times.filter(time => !time.dnf);
  const showGraph = noDnfTimes.length > 1;

  return (
    <TimeTableContainer>
      <TimeTableColumn>
        <TimeBoardRowHeading>
          <div>
            <strong>Stats</strong>
          </div>
          <div>
            <QuestionIconButton onClick={showStatsInfo}>
              <FontAwesome icon={faQuestionCircle} size="sm" />
            </QuestionIconButton>
            <Modal title="Stats" isOpen={statsInfoOpen}>
              <Section margin="md">
                <p>After 2 valid solves (excluding DNF{`'`}s) a trend graph will be shown.</p>

                <p>When a minimum of 3 solves are present the mean of 3 (<strong>mo3</strong>) will be shown (best average of 3 consecutive solves).</p>

                <p>After 5 solves the average of the <i>last</i> 5 solves (without the best and the worst solve) will be shown (<strong>ao5</strong>). After that it will continue with: <strong>ao12, ao25, ao50* and ao100*</strong>.</p>

                <i>*The a50 will exclude the best and worst 3 solves, the ao100 will exclude 5.</i>
              </Section>
              <Button onClick={hideStatsInfo}>Close</Button>
            </Modal>
          </div>
        </TimeBoardRowHeading>
        {
          (STATS.filter(stat => stats[stat]).length === 0 && !showGraph) &&
          <TimeBoardRow>
            <i>Not enough solves yet.</i>
          </TimeBoardRow>
        }
        {
          STATS
            .filter(stat => stats[stat])
            .map(stat => (
              <TimeBoardRow key={stat}>
                <div>
                  <TimeIndex>{stat}</TimeIndex>
                  <strong>
                    <Time
                      ms={stats[stat] === 'DNF' ? Infinity : stats[stat]}
                      dnf={stats[stat] === 'DNF'}
                    />
                  </strong>
                </div>
              </TimeBoardRow>
            ))
        }
        {
          showGraph &&
          <TimeBoardGraphRow>
            <TimeGraph times={noDnfTimes}/>
          </TimeBoardGraphRow>
        }
      </TimeTableColumn>
      <TimeTableColumn>
        <TimeBoardRowHeading>
          Times
        </TimeBoardRowHeading>
        {times.map(({ ms, id, best, date, scramble, showDetails, puzzle, dnf, plus2 }, index) => (
          <TimeBoardRow key={index}>
            <div>
              <TimeIndex>{index + 1}.</TimeIndex>
                <Time ms={ms} dnf={dnf} plus2={plus2}/>
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
                <TimeDetails
                  puzzle={puzzle}
                  dnf={dnf}
                  plus2={plus2}
                  date={date}
                  ms={ms}
                  scramble={scramble}
                  hideTimeDetails={hideTimeDetails}
                />
              </Modal>
              {
                editable &&
                <RemoveItemIconButton onClick={() => removeTime(id)}>
                  <FontAwesome icon={faTimes} size="sm" />
                </RemoveItemIconButton>
              }
            </div>
          </TimeBoardRow>
        ))}
      </TimeTableColumn>
    </TimeTableContainer>
  )
}

TimeTable.propTypes = {
  stats: PropTypes.object.isRequired,
  showStatsInfo: PropTypes.func.isRequired,
  editable: PropTypes.bool,
  hideStatsInfo: PropTypes.func.isRequired,
  statsInfoOpen: PropTypes.bool.isRequired,
  hideTimeDetails: PropTypes.func.isRequired,
  removeTime: PropTypes.func,
  showTimeDetails: PropTypes.func.isRequired,
  times: PropTypes.arrayOf(PropTypes.object).isRequired
};

const TimeTableContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 512px) {
    flex-direction: row;
  }
`;

const TimeTableColumn = styled.div`
  margin-bottom: ${props => props.theme.sizes.sm};

  &:last-child {
    margin-bottom: 0;
  }

  @media screen and (min-width: 512px) {
    width: 50%;
    margin-right: ${props => props.theme.sizes.md};
    margin-bottom: 0;

    &:last-child {
      margin-right: 0;
    }
  }
}
`;

const TimeBoardRow = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  border-bottom: 1px solid ${props => props.theme.colors.grey};
  justify-content: space-between;
  align-items: center;
  height: 3.6rem;
`;

const TimeBoardRowHeading = TimeBoardRow.extend`
  border-bottom: 2px solid ${props => props.theme.colors.grey};
  font-weight: bold;
`;

const TimeBoardGraphRow = TimeBoardRow.extend`
  display: block;
  height: auto;
  padding-top: ${props => props.theme.sizes.xs};
  font-weight: bold;
`;

const TimeInfo = styled.small`
  padding-left: ${props => props.theme.sizes.xs};
  color: ${props => props.theme.colors.subtleFg};
  font-size: 1.5rem;
`;

const TimeIndex = styled.span`
  display: inline-block;
  width: 3.1em;
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
