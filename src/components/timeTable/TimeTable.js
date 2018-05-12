import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faTimes, faThumbsUp, faInfoCircle, faQuestionCircle } from '@fortawesome/fontawesome-pro-solid';

import * as CustomPropTypes from '../../propTypes';
import Time from '../shared/Time';
import TimeGraph from './TimeGraph';
import ModalContainer from '../../containers/shared/ModalContainer';
import IconButton from '../shared/IconButton';
import TimeDetails from './TimeDetails';
import Section from '../shared/Section';

const STATS = ['ao5', 'ao12', 'ao25', 'ao50', 'ao100', 'mo3'];

const TimeTable = ({ stats, editable = true, removeTime, times }) => {
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
            <ModalContainer
              title="Stats"
              id="statsInfo"
              toggle={openModal => (
                <QuestionIconButton onClick={openModal}>
                  <FontAwesome icon={faQuestionCircle} size="sm" />
                </QuestionIconButton>
              )}
              content={() => (
                <Section margin="sm">
                  <p>After 2 valid solves (excluding DNF{`'`}s) a trend graph will be shown.</p>

                  <p>When a minimum of 3 solves are present the mean of 3 (<strong>mo3</strong>) will be shown (best average of 3 consecutive solves).</p>

                  <p>After 5 solves the average of the <i>last</i> 5 solves (without the best and the worst solve) will be shown (<strong>ao5</strong>). After that it will continue with: <strong>ao12, ao25, ao50* and ao100*</strong>.</p>

                  <i>*The a50 will exclude the best and worst 3 solves, the ao100 will exclude 5.</i>
                </Section>
              )}
            />
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
                      time={{
                        ms: stats[stat] === 'DNF' ? Infinity : stats[stat],
                        dnf: stats[stat] === 'DNF'
                      }}
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
        {times.map((time, index) => (
          <TimeBoardRow key={index}>
            <div>
              <TimeIndex>{index + 1}.</TimeIndex>
                <Time time={time}/>
                {
                  (time.best && times.length > 1) &&
                  <TimeInfo>
                    <BestTimeIcon><FontAwesome icon={faThumbsUp}/></BestTimeIcon>
                  </TimeInfo>
                }
            </div>
            <div>
              <ModalContainer
                title="Details"
                id={'timeDetails.' + time.id}
                toggle={openModal => (
                  <InfoIconButton onClick={openModal}>
                    <FontAwesome icon={faInfoCircle} size="sm" />
                  </InfoIconButton>
                )}
                content={() => <TimeDetails time={time}/>}
              />
              {
                editable &&
                <RemoveItemIconButton onClick={() => removeTime(time.id)}>
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
  editable: PropTypes.bool,
  removeTime: PropTypes.func,
  times: PropTypes.arrayOf(CustomPropTypes.Time).isRequired
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
