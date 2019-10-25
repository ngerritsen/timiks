import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import * as CustomPropTypes from '../../propTypes';
import TimeGraph from '../shared/TimeGraph';
import Section from '../shared/Section';
import { formatLocalDate } from '../../helpers/dateTime';
import { getColor } from '../../helpers/theme';
import ArchiveOptionsContainer from '../../containers/archive/ArchiveOptionsContainer';
import ArchiveItem from './ArchiveItem';
import { getPuzzle } from '../../helpers/puzzle';
import { ARCHIVE_DAYS_OPTIONS } from '../../constants/settings';
import { decapitalize } from '../../helpers/formatting';
import Stats from './Stats';
import SectionTitle from '../shared/SectionTitle';
import Tiles from '../shared/Tiles';
import Button from '../shared/Button';

const Archive = ({
  times,
  stats,
  days,
  puzzle,
  removeTime,
  timesPerDay,
  requireTimes,
  fixGraphYAxis
}) => {
  useEffect(() => {
    requireTimes(false, puzzle, days);
  }, [puzzle, days]);
  const [showLastStats, setShowLastStats] = useState(false);

  return (
    <>
      {times.length > 1 && (
        <Section margin="md">
          <TimeGraph times={times} stats={stats} enableZoom fixYAxis={fixGraphYAxis} />
        </Section>
      )}
      <Section margin="lg">
        <ArchiveOptionsContainer />
      </Section>
      {times.length === 0 && (
        <Message>
          No {getPuzzle(puzzle).title} solves in the{' '}
          {decapitalize(ARCHIVE_DAYS_OPTIONS.find(option => option.value === days).label)}.
        </Message>
      )}
      {stats.length > 0 && (
        <Section margin="lg">
          <SectionTitle>{showLastStats ? 'Last' : 'Top'} stats</SectionTitle>
          <Section margin="sm">
            <Stats solves={times.length} stats={stats} showLast={showLastStats} />
          </Section>
          <Section margin="sm">
            <Button size="sm" tag color="subtleBg" onClick={() => setShowLastStats(!showLastStats)}>
              Show {showLastStats ? 'top' : 'last'} stats
            </Button>
          </Section>
        </Section>
      )}
      {timesPerDay.map(({ date, times }) => (
        <Section margin="md" key={date.toISOString()}>
          <SectionTitle>{formatLocalDate(date)}</SectionTitle>
          <Tiles>
            {times.map(time => (
              <ArchiveItem key={time.id} time={time} removeTime={removeTime} />
            ))}
          </Tiles>
        </Section>
      ))}
    </>
  );
};

Archive.propTypes = {
  times: PropTypes.arrayOf(CustomPropTypes.Time).isRequired,
  timesPerDay: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date),
      times: PropTypes.arrayOf(CustomPropTypes.Time).isRequired
    })
  ).isRequired,
  requireTimes: PropTypes.func.isRequired,
  stats: PropTypes.arrayOf(CustomPropTypes.Stat).isRequired,
  puzzle: PropTypes.string.isRequired,
  days: PropTypes.number.isRequired,
  removeTime: PropTypes.func.isRequired,
  fixGraphYAxis: PropTypes.bool
};

const Message = styled.p`
  color: ${getColor('grey')};
  font-weight: bold;
  padding: 15vh 0;
  text-align: center;
`;

export default Archive;
