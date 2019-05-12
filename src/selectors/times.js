import { getPuzzle } from './settings';
import { markBestTime, calculateStats } from '../helpers/times';
import { createSelector } from 'reselect';
import { getLastTimeId } from './timer';

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

export const getStatsForCurrentTimes = createSelector(
  getCurrentTimes,
  calculateStats
);
export const getArchivedTimesForPuzzle = createSelector(
  getArchivedTimes,
  getPuzzle,
  (times, puzzle) => times.filter(time => time.puzzle === puzzle)
);

export const getStatsForArchivedTimesForPuzzle = createSelector(
  getArchivedTimesForPuzzle,
  calculateStats
);
