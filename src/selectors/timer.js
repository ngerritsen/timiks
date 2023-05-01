import { createSelector } from "reselect";
import { parseTimeInput } from "../helpers/time";
import { shouldUseInspectionTime } from "./settings";
import { INSPECTION_TIME } from "../constants/timer";

export const getTime = (state) => state.timer.time;
export const getLastTimeId = (state) => state.timer.lastTimeId;
export const isStopped = (state) => state.timer.stopped;
export const getStopTime = (state) => state.timer.stopTime;
export const getTimeInput = (state) => state.timer.timeInput;
export const isInspecting = (state) => state.timer.inspecting;
export const getInspectionStartTime = (state) =>
  state.timer.inspectionStartTime;
export const getStartTime = (state) => state.timer.startTime;

export const hasInspectionPenalty = (state) =>
  shouldUseInspectionTime(state) &&
  getStartTime(state) - getInspectionStartTime(state) > INSPECTION_TIME;

export const isValidTimeInput = createSelector(getTimeInput, (timeInput) =>
  Boolean(parseTimeInput(timeInput))
);
