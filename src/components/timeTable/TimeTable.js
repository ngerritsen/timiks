import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FontAwesome from '@fortawesome/react-fontawesome';
import faQuestionCircle from '@fortawesome/fontawesome-pro-solid/faQuestionCircle';

import * as CustomPropTypes from '../../propTypes';
import TimeGraph from '../shared/TimeGraph';
import ToggleContent from '../shared/ToggleContent';
import IconButton from '../shared/IconButton';
import Tag from '../shared/Tag';
import Section from '../shared/Section';
import Modal from '../shared/Modal';
import TimeTableTimeRow from './TimeTableTimeRow';
import { Cell, HeadingCell, Table } from '../shared/Table';
import TimeTableStatRow from './TimeTableStatRow';
import StatsExplanation from './StatsExplanation';
import { getBreakpoint, getSize } from '../../helpers/theme';

function useHighlightedStats() {
  const [highlightState, setHighlightedStat] = useState([]);
  const [highlightedStatName, highlightedStatType] = highlightState;

  return [highlightedStatName, highlightedStatType, setHighlightedStat];
}

const TimeTable = ({ stats, removeTime, times, showGraph }) => {
  const [
    softHighlightedStatName,
    softHighlightedStatType,
    setSoftHighlightedStat
  ] = useHighlightedStats(stats);

  const [
    hardHighlightedStatName,
    hardHighlightedStatType,
    setHardHighlightedStat
  ] = useHighlightedStats(stats);

  const highlightedStatName = softHighlightedStatName || hardHighlightedStatName;
  const highlightedStatType = softHighlightedStatType || hardHighlightedStatType;
  const highlightedStat = stats.find(stat => stat.name === highlightedStatName) || {};
  const { includedIds = [], excludedIds = [] } = highlightedStat[highlightedStatType] || {};

  return (
    <TimeTableContainer>
      <TimeTableColumn>
        <Section margin={showGraph ? 'xs' : ''}>
          <Table>
            <thead>
              <tr>
                <HeadingCell>Stats</HeadingCell>
                <HeadingCell>Current</HeadingCell>
                <HeadingCell>Best</HeadingCell>
                <HeadingCell rightAlign>
                  <ToggleContent
                    toggle={({ show }) => (
                      <QuestionIconButton color="blue" onClick={show}>
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
              {stats.length === 0 && (
                <tr>
                  <Cell colSpan="2">
                    <i>Not enough solves yet.</i>
                  </Cell>
                </tr>
              )}
              {stats.length > 0 &&
                stats.map(stat => (
                  <TimeTableStatRow
                    key={stat.name}
                    name={stat.name}
                    current={stat.current}
                    best={stat.best}
                    softHighlightedStatName={softHighlightedStatName}
                    softHighlightedStatType={softHighlightedStatType}
                    hardHighlightedStatName={hardHighlightedStatName}
                    hardHighlightedStatType={hardHighlightedStatType}
                    onHardHighlight={setHardHighlightedStat}
                    onSoftHighlight={setSoftHighlightedStat}
                  />
                ))}
            </tbody>
          </Table>
        </Section>
        {showGraph && <TimeGraph stats={stats} times={times} />}
      </TimeTableColumn>
      <TimeTableColumn>
        <Table>
          <thead>
            <tr>
              <HeadingCell colSpan="3">
                Times &nbsp;
                <Tag size="sm" color="subtleBg">
                  {times.length}
                </Tag>
              </HeadingCell>
            </tr>
          </thead>
          <tbody>
            {times.map((time, index) => (
              <TimeTableTimeRow
                key={time.id}
                time={time}
                index={index}
                removeTime={removeTime}
                isIncluded={includedIds.includes(time.id)}
                isExcluded={excludedIds.includes(time.id)}
              />
            ))}
          </tbody>
        </Table>
      </TimeTableColumn>
    </TimeTableContainer>
  );
};

TimeTable.propTypes = {
  stats: PropTypes.arrayOf(CustomPropTypes.Stat).isRequired,
  removeTime: PropTypes.func.isRequired,
  times: PropTypes.arrayOf(CustomPropTypes.Time).isRequired,
  showGraph: PropTypes.bool
};

const TimeTableContainer = styled.div`
  @media screen and (min-width: ${getBreakpoint('sm')}) {
    flex-direction: row;
    display: flex;
  }
`;

const TimeTableColumn = styled.div`
  margin-bottom: ${getSize('xs')};
  overflow: auto;

  &:last-child {
    margin-bottom: 0;
  }

  @media screen and (min-width: ${getBreakpoint('sm')}) {
    width: 50%;
    margin-right: ${getSize('md')};
    margin-bottom: 0;

    &:last-child {
      margin-right: 0;
    }
  }
}
`;

const QuestionIconButton = IconButton.extend`
  margin-left: ${getSize('xs')};
`;

export default React.memo(TimeTable);
