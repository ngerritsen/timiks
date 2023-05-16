import { getArchivePuzzle, getArchiveDays, getPuzzle } from "./settings";
import { markBestTime, isCurrent, getId } from "../helpers/times";
import { calculateStats } from "../helpers/stats";

import { createSelector } from "reselect";
import { getLastTimeId } from "./timer";
import { groupByDay } from "../helpers/archive";
import { createAscSorter } from "../helpers/general";
import { getDateForDaysAgo } from "../helpers/dateTime";
import { RootState } from "../store";

export const getTimes = (state: RootState) => state.times.times;

export const getTime = (state: RootState, id: string) =>
  getTimes(state).find((time) => time.id === id);

export const getCurrentTimes = createSelector(
  getTimes,
  getPuzzle,
  (times, puzzle) =>
    times.filter(isCurrent).filter((time) => time.puzzle === puzzle)
);

export const getRequiredTimes = (state: RootState) => state.times.requiredTimes;

export const getCurrentTimeIds = (state: RootState) =>
  getCurrentTimes(state).map(getId);

export const getTimesForLocalStorage = (
  state: RootState,
  isLoggedIn: boolean
) => (isLoggedIn ? getUnstoredTimes(state) : getTimes(state));

export const getUnstoredTimes = (state: RootState) =>
  getTimes(state).filter((time) => !time.stored);

export const getArchivedTimes = createSelector(getTimes, (times) =>
  times.filter((time) => !time.current)
);

export const hasCurrentTimes = (state: RootState) =>
  getCurrentTimes(state).length > 0;

export const getCurrentMarkedSortedTimes = createSelector(
  getCurrentTimes,
  (times) => markBestTime(times).sort(createAscSorter("date"))
);

export const getLastTime = createSelector(
  getCurrentMarkedSortedTimes,
  getLastTimeId,
  (times, lastTimeId) => times.find((time) => time.id === lastTimeId)
);

export const getCurrentNoDnfTimes = createSelector(getCurrentTimes, (times) =>
  times.filter((time) => !time.dnf).sort(createAscSorter("date"))
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
      .filter(
        (time) => time.puzzle === puzzle && (!fromDate || time.date >= fromDate)
      )
      .sort(createAscSorter("date"));
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
