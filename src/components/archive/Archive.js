import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import * as CustomPropTypes from '../../propTypes';
import TimeGraph from '../shared/TimeGraph';
import Section from '../shared/Section';
import { formatLocalDate } from '../../helpers/dateTime';
import { getBreakpoint, getSize, getColor } from '../../helpers/theme';
import ArchiveOptionsContainer from '../../containers/archive/ArchiveOptionsContainer';
import ArchiveItem from './ArchiveItem';
import { getPuzzle } from '../../helpers/puzzle';
import { ARCHIVE_DAYS_OPTIONS } from '../../constants/settings';
import { decapitalize } from '../../helpers/formatting';
import TopStats from './TopStats';
import SectionTitle from '../shared/SectionTitle';

const Archive = ({ times, stats, days, puzzle, removeTime, timesPerDay, requireTimes }) => {
  useEffect(() => {
    requireTimes(false, puzzle, days);
  }, [puzzle, days]);

  return (
    <>
      {times.length > 1 && (
        <Section margin="md">
          <TimeGraph times={times} stats={stats} enableZoom />
        </Section>
      )}
      <Section margin="md">
        <ArchiveOptionsContainer />
      </Section>
      {times.length === 0 && (
        <Message>
          No {getPuzzle(puzzle).title} solves in the{' '}
          {decapitalize(ARCHIVE_DAYS_OPTIONS.find(option => option.value === days).label)}.
        </Message>
      )}
      {stats.length > 0 && (
        <Section margin="md">
          <SectionTitle>Top Stats</SectionTitle>
          <TopStats solves={times.length} stats={stats} />
        </Section>
      )}
      {timesPerDay.map(({ date, times }) => (
        <Section margin="md" key={date.toISOString()}>
          <SectionTitle>{formatLocalDate(date)}</SectionTitle>
          <TimeTiles>
            {times.map(time => (
              <ArchiveItem key={time.id} time={time} removeTime={removeTime} />
            ))}
          </TimeTiles>
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
  removeTime: PropTypes.func.isRequired
};

const TimeTiles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: ${getSize('xs')};
  grid-row-gap: ${getSize('xs')};

  @media screen and (min-width: ${getBreakpoint('sm')}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  @media screen and (min-width: ${getBreakpoint('md')}) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }

  @media screen and (min-width: ${getBreakpoint('lg')}) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  }
`;

const Message = styled.p`
  color: ${getColor('grey')};
  font-weight: bold;
  padding: 15vh 0;
  text-align: center;
`;

export default Archive;
