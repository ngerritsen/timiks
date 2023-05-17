import { createAction } from "redux-actions";
import * as types from "./constants/actionTypes";

// Timer
export const resetTime = createAction(types.RESET_TIME);
export const startTimer = createAction(
  types.START_TIMER,
  (startTime) => startTime
);
export const stopTimer = createAction(types.STOP_TIMER, (stopTime) => stopTime);
export const prepareInspection = createAction(types.PREPARE_INSPECTION);
export const startInspection = createAction(
  types.START_INSPECTION,
  (startTime) => startTime
);
export const failInspection = createAction(types.FAIL_INSPECTION);
export const submitTimeInput = createAction(
  types.SUBMIT_TIME_INPUT,
  (ms, dnf, plus2) => ({
    ms,
    dnf,
    plus2,
  })
);
export const updateTimeInput = createAction(
  types.UPDATE_TIME_INPUT,
  (timeInput) => timeInput
);
export const setIsTraining = createAction(
  types.SET_IS_TRAINING,
  (isTraining) => isTraining
);

// Activation
export const prepareActivation = createAction(types.PREPARE_ACTIVATION);
export const skipPreparationStage = createAction(types.SKIP_PREPARATION_STAGE);
export const resetActivation = createAction(types.RESET_ACTIVATION);
export const incrementPreparationStage = createAction(
  types.INCREMENT_PREPARATION_STAGE
);
