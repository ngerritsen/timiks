import { createSelector } from 'reselect';
import { parseTimeInput } from '../helpers/time';

export const canReset = state => state.timer.startTime > 0 || state.timer.stopTime > 0;
export const getTime = state => state.timer.time;
export const getLastTimeId = state => state.timer.lastTimeId;
export const isStopped = state => state.timer.stopped;
export const getTimeInput = state => state.timer.timeInput;
export const isInInspectionMode = state => state.timer.inspectionMode;

export const isValidTimeInput = createSelector(
  getTimeInput,
  timeInput => Boolean(parseTimeInput(timeInput))
);
