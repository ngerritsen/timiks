import { getPuzzle } from './settings';
import { markBestTime, calculateStats } from '../helpers/times';
import { createSelector } from 'reselect';
import { getLastTimeId } from './timer';
import { groupByDay } from '../helpers/archive';
import { createAscSorter } from '../helpers/general';

export const getCurrentTimes = state => state.times.current;
export const getArchivedTimes = state => state.times.archived;
export const hasCurrentTimes = state => state.times.current.length > 0;

export const getLastTime = createSelector(
  getCurrentTimes,
  getLastTimeId,
  (times, lastTimeId) => times.find(time => time.id === lastTimeId)
);

export const getCurrentMarkedTimes = createSelector(
  getCurrentTimes,
  markBestTime
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
