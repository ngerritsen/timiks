import { shouldUseInspectionTime } from "./settings";
import { INSPECTION_TIME, PREPARATION_STAGES } from "../constants/timer";
import { RootState } from "../store";
import { createSelector } from "reselect";
import { isValidTime, parseTimeInput } from "../helpers/time";

export const getTimerState = (state: RootState) => state.timer;
export const getStartTime = (state: RootState) => state.timer.startTime;
export const getLastTimeId = (state: RootState) => state.timer.lastTimeId;
export const getTimeInput = (state: RootState) => state.timer.timeInput;
export const isStopped = (state: RootState) => state.timer.stopped;
export const getStopTime = (state: RootState) => state.timer.stopTime;
export const isInspecting = (state: RootState) => state.timer.inspecting;
export const isTraining = (state: RootState) => state.timer.isTraining;

export const getInspectionStartTime = (state: RootState) =>
  state.timer.inspectionStartTime;

export const getTimeInputTime = createSelector(getTimeInput, parseTimeInput);
export const isTimeInputValid = createSelector(getTimeInputTime, isValidTime);

export const hasInspectionPenalty = (state: RootState) =>
  shouldUseInspectionTime(state) &&
  getStartTime(state) - getInspectionStartTime(state) > INSPECTION_TIME;

export const isReady = (state: RootState) =>
  getPreparationStage(state) >= PREPARATION_STAGES;

export const isPreparing = (state: RootState) =>
  getPreparationStage(state) > -1;

export const getPreparationStage = (state: RootState) =>
  state.timer.preparationStage;

export const isPreparingForInspection = (state: RootState) =>
  state.timer.preparingForInspection;
