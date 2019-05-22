import { createSelector } from 'reselect';
import { parseTimeInput } from '../helpers/time';

export const getTime = state => state.timer.time;
export const getLastTimeId = state => state.timer.lastTimeId;
export const isStopped = state => state.timer.stopped;
export const getTimeInput = state => state.timer.timeInput;
export const isInspecting = state => state.timer.inspecting;
export const getInspectionStartTime = state => state.timer.inspectionStartTime;
export const getStartTime = state => state.timer.startTime;
export const isValidTimeInput = createSelector(
  getTimeInput,
  timeInput => Boolean(parseTimeInput(timeInput))
);
