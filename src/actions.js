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

// Authentication
export const login = createAction(types.LOGIN);
export const loginSucceeded = createAction(
  types.LOGIN_SUCCEEDED,
  (userId, displayName, email, avatarUrl) => ({
    userId,
    displayName,
    email,
    avatarUrl,
  })
);
export const loginFailed = createAction(types.LOGIN_FAILED);
export const logout = createAction(types.LOGOUT);
export const logoutSucceeded = createAction(types.LOGOUT_SUCCEEDED);
export const logoutFailed = createAction(types.LOGOUT_FAILED);

// Scramble
export const setScramble = createAction(
  types.SET_SCRAMBLE,
  (scramble, puzzle) => ({
    scramble,
    puzzle,
  })
);
export const refreshScramble = createAction(types.REFRESH_SCRAMBLE);

// Times
export const saveTime = createAction(types.SAVE_TIME, (time) => time);
export const updateTime = createAction(types.UPDATE_TIME, (id, fields) => ({
  id,
  fields,
}));
export const loadTimes = createAction(
  types.LOAD_TIMES,
  (times = [], current, puzzle) => ({
    times,
    current,
    puzzle,
  })
);
export const loadLocalTimes = createAction(
  types.LOAD_LOCAL_TIMES,
  (times = []) => times
);
export const removeTime = createAction(types.REMOVE_TIME, (id) => id);
export const clearTimes = createAction(types.CLEAR_TIMES);
export const archiveTimes = createAction(types.ARCHIVE_TIMES);
export const storedLocalTimes = createAction(types.STORED_LOCAL_TIMES);
export const requireTimes = createAction(
  types.REQUIRE_TIMES,
  (current, puzzle, days) => ({
    current,
    puzzle,
    days,
  })
);

// Settings
export const loadSettings = createAction(
  types.LOAD_SETTINGS,
  (settings) => settings
);
export const settingsStored = createAction(types.SETTINGS_STORED);
export const changeSetting = createAction(
  types.CHANGE_SETTING,
  (setting, value) => ({
    setting,
    value,
  })
);

// Import
export const importTimes = createAction(types.IMPORT_TIMES, (times) => ({
  times,
}));

// Network
export const networkOnline = createAction(types.NETWORK_ONLINE);
export const networkOffline = createAction(types.NETWORK_OFFLINE);
