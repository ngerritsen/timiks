import { createSelector } from 'reselect';
import { parseTimeInput } from '../helpers/time';

export function canReset(state) {
  return state.timer.startTime > 0 || state.timer.stopTime > 0;
}

export function getTime(state) {
  return state.timer.time;
}

export function getLastTimeId(state) {
  return state.timer.lastTimeId;
}

export function isStopped(state) {
  return state.timer.stopped;
}

export function getTimeInput(state) {
  return state.timer.timeInput;
}

export function isInInspectionMode(state) {
  return state.timer.inspectionMode;
}

export const isValidTimeInput = createSelector(
  getTimeInput,
  timeInput => Boolean(parseTimeInput(timeInput))
);
