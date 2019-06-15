import { getArchivePuzzle, getArchiveDays } from './settings';
import { markBestTime, isCurrent, getId } from '../helpers/times';
import { calculateStats } from '../helpers/stats';

import { createSelector } from 'reselect';
import { getLastTimeId } from './timer';
import { groupByDay } from '../helpers/archive';
import { createAscSorter } from '../helpers/general';
import { getDateForDaysAgo } from '../helpers/dateTime';

export const getTimes = state => state.times.times;

export const getTime = (state, id) => getTimes(state).find(time => time.id === id);

export const getCurrentTimes = createSelector(
  getTimes,
  times => times.filter(isCurrent)
);

export const getRequiredTimes = state => state.times.requiredTimes;

export const getCurrentTimeIds = state =>
  getTimes(state)
    .filter(isCurrent)
    .map(getId);

export const getTimesForLocalStorage = (state, isLoggedIn) =>
  isLoggedIn ? getUnstoredTimes(state) : getTimes(state);

export const getUnstoredTimes = state => getTimes(state).filter(time => !time.stored);

export const getArchivedTimes = createSelector(
  getTimes,
  times => times.filter(time => !time.current)
);

export const hasCurrentTimes = state => getCurrentTimes(state).length > 0;

export const getCurrentMarkedSortedTimes = createSelector(
  getCurrentTimes,
  times => markBestTime(times).sort(createAscSorter('date'))
);

export const getLastTime = createSelector(
  getCurrentMarkedSortedTimes,
  getLastTimeId,
  (times, lastTimeId) => times.find(time => time.id === lastTimeId)
);

export const getCurrentNoDnfTimes = createSelector(
  getCurrentTimes,
  times => times.filter(time => !time.dnf).sort(createAscSorter('date'))
);

export const getStatsForCurrentTimes = createSelector(
  getCurrentMarkedSortedTimes,
  calculateStats
);

export const getSortedFilteredArchivedTimes = createSelector(
  getArchivedTimes,
  getArchivePuzzle,
  getArchiveDays,
  (times, puzzle, days) => {
    const fromDate = days ? getDateForDaysAgo(days) : null;
    return times
      .filter(time => time.puzzle === puzzle && (!fromDate || time.date >= fromDate))
      .sort(createAscSorter('date'));
  }
);

export const getArchivedTimesPerDayForPuzzle = createSelector(
  getSortedFilteredArchivedTimes,
  groupByDay
);

export const getStatsForArchivedTimesForPuzzle = createSelector(
  getSortedFilteredArchivedTimes,
  calculateStats
);
