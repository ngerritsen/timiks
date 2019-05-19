import { getPuzzle } from './settings';
import { markBestTime, calculateStats, isCurrent, getId } from '../helpers/times';
import { createSelector } from 'reselect';
import { getLastTimeId } from './timer';
import { groupByDay } from '../helpers/archive';
import { createAscSorter } from '../helpers/general';

export const getTimes = state => state.times.times;

export const getTime = (state, id) => getTimes(state).find(time => time.id === id);

export const getCurrentTimes = createSelector(
  getTimes,
  times => times.filter(isCurrent)
);

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

export const getLastTime = createSelector(
  getCurrentTimes,
  getLastTimeId,
  (times, lastTimeId) => times.find(time => time.id === lastTimeId)
);

export const getCurrentMarkedSortedTimes = createSelector(
  getCurrentTimes,
  times => markBestTime(times).sort(createAscSorter('date'))
);

export const getCurrentNoDnfTimes = createSelector(
  getCurrentTimes,
  times => times.filter(time => !time.dnf)
);

export const getStatsForCurrentTimes = createSelector(
  getCurrentTimes,
  calculateStats
);

export const getSortedArchivedTimesForPuzzle = createSelector(
  getArchivedTimes,
  getPuzzle,
  (times, puzzle) => times.filter(time => time.puzzle === puzzle).sort(createAscSorter('date'))
);

export const getArchivedTimesPerDayForPuzzle = createSelector(
  getSortedArchivedTimesForPuzzle,
  groupByDay
);

export const getStatsForArchivedTimesForPuzzle = createSelector(
  getSortedArchivedTimesForPuzzle,
  calculateStats
);
