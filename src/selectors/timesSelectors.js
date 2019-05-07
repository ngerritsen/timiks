import { getPuzzle } from "./settingsSelector";

export function getArchivedTimes(state) {
  return state.times.archived;
}

export function getArchivedTimesForPuzzle(state) {
  return getArchivedTimes(state).filter(time => time.puzzle === getPuzzle(state))
}

export function getLastTime(state) {
  return state.times.current.find(time => time.id === state.timer.lastTimeId);
}
