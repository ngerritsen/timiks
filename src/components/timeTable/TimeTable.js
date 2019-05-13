import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/fontawesome-pro-solid';

import { AVAILABLE_STATS } from '../../constants/app';
import * as CustomPropTypes from '../../propTypes';
import TimeGraph from './TimeGraph';
import ToggleContent from '../ToggleContent';
import IconButton from '../shared/IconButton';
import Section from '../shared/Section';
import Tag from '../shared/Tag';
import Modal from '../shared/Modal';
import TimeTableTimeRow from './TimeTableTimeRow';
import { Cell, HeadingCell, SubtleHeadingCell, Tables } from '../shared/Tables';
import TimeTableStatRow from './TimeTableStatRow';
import StatsExplanation from './StatsExplanation';

const TimeTable = ({ stats, removeTime, times, noDnfTimes, showGraph }) => {
  return (
    <TimeTableContainer>
      <TimeTableColumn>
        <Tables>
          <thead>
            <tr>
              <HeadingCell>Stats</HeadingCell>
              <SubtleHeadingCell>Current</SubtleHeadingCell>
              <SubtleHeadingCell>Best</SubtleHeadingCell>
              <HeadingCell rightAlign>
                <ToggleContent
                  toggle={({ show }) => (
                    <QuestionIconButton onClick={show}>
                      <FontAwesome icon={faQuestionCircle} size="sm" />
                    </QuestionIconButton>
                  )}
                  content={({ hide }) => (
                    <Modal title="Stats" onClose={hide}>
                      <StatsExplanation />
                    </Modal>
                  )}
                />
              </HeadingCell>
            </tr>
          </thead>
          <tbody>
            {AVAILABLE_STATS.filter(stat => stats[stat.name]).length === 0 && !showGraph && (
              <tr>
                <Cell colSpan="2">
                  <i>Not enough solves yet.</i>
                </Cell>
              </tr>
            )}
            {AVAILABLE_STATS.filter(stat => stats[stat.name]).map(stat => {
              const { current, best } = stats[stat.name];
              return (
                <TimeTableStatRow key={stat.name} name={stat.name} current={current} best={best} />
              );
            })}
          </tbody>
        </Tables>
        {showGraph && (
          <Section margin="xs">
            <GraphContainer>
              <TimeGraph stats={stats} times={noDnfTimes} />
            </GraphContainer>
          </Section>
        )}
      </TimeTableColumn>
      <TimeTableColumn>
        <Tables>
          <thead>
            <tr>
              <HeadingCell colSpan="3">
                Times <Tag>{times.length}</Tag>
              </HeadingCell>
            </tr>
          </thead>
          <tbody>
            {times.map((time, index) => (
              <TimeTableTimeRow key={time.id} time={time} index={index} removeTime={removeTime} />
            ))}
          </tbody>
        </Tables>
      </TimeTableColumn>
    </TimeTableContainer>
  );
};

TimeTable.propTypes = {
  stats: PropTypes.object.isRequired,
  removeTime: PropTypes.func,
  times: PropTypes.arrayOf(CustomPropTypes.Time).isRequired,
  noDnfTimes: PropTypes.arrayOf(CustomPropTypes.Time).isRequired,
  showGraph: PropTypes.bool
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
  overflow: auto;

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

const GraphContainer = styled.div`
  padding-top: ${props => props.theme.sizes.sm};
`;

const QuestionIconButton = IconButton.extend`
  color: ${props => props.theme.colors.blue};
  margin-left: ${props => props.theme.sizes.xs};
`;

export default React.memo(TimeTable);
