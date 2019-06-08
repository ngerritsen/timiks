import { createAction } from 'redux-actions';
import * as types from './constants/actionTypes';

// Timer
export const resetTime = createAction(types.RESET_TIME);
export const startTimer = startTime => ({ type: types.START_TIMER, startTime });
export const stopTimer = stopTime => ({ type: types.STOP_TIMER, stopTime });
export const prepareInspection = createAction(types.PREPARE_INSPECTION);
export const startInspection = startTime => ({ type: types.START_INSPECTION, startTime });
export const failInspection = createAction(types.FAIL_INSPECTION);
export const submitTimeInput = (ms, dnf, plus2) => ({
  type: types.SUBMIT_TIME_INPUT,
  ms,
  dnf,
  plus2
});
export const updateTimeInput = timeInput => ({ type: types.UPDATE_TIME_INPUT, timeInput });

// Activation
export const prepareActivation = createAction(types.PREPARE_ACTIVATION);
export const skipPreparationStage = createAction(types.SKIP_PREPARATION_STAGE);
export const resetActivation = createAction(types.RESET_ACTIVATION);
export const incrementPreparationStage = createAction(types.INCREMENT_PREPARATION_STAGE);

// Authentication
export const login = createAction(types.LOGIN);
export const loginSucceeded = (userId, displayName, email) => ({
  type: types.LOGIN_SUCCEEDED,
  userId,
  displayName,
  email
});
export const loginFailed = createAction(types.LOGIN_FAILED);
export const logout = createAction(types.LOGOUT);
export const logoutSucceeded = createAction(types.LOGOUT_SUCCEEDED);
export const logoutFailed = createAction(types.LOGOUT_FAILED);

// Scramble
export const setScramble = (scramble, puzzle) => ({
  type: types.SET_SCRAMBLE,
  scramble,
  puzzle
});
export const refreshScramble = createAction(types.REFRESH_SCRAMBLE);

// No Sleep
export const noSleepEnabled = createAction(types.NO_SLEEP_ENABLED);
export const noSleepDisabled = createAction(types.NO_SLEEP_DISABLED);

// Times
export const saveTime = time => ({ type: types.SAVE_TIME, time });
export const updateTime = (id, fields) => ({ type: types.UPDATE_TIME, id, fields });
export const loadTimes = (times = [], current, puzzle) => ({
  type: types.LOAD_TIMES,
  times,
  current,
  puzzle
});
export const loadLocalTimes = (times = []) => ({ type: types.LOAD_LOCAL_TIMES, times });
export const removeTime = createAction(types.REMOVE_TIME, id => id);
export const clearTimes = createAction(types.CLEAR_TIMES);
export const archiveTimes = createAction(types.ARCHIVE_TIMES);
export const storedLocalTimes = createAction(types.STORED_LOCAL_TIMES);
export const requireTimes = createAction(types.REQUIRE_TIMES, (current, puzzle) => ({
  current,
  puzzle
}));

// Settings
export const loadSettings = createAction(types.LOAD_SETTINGS, settings => settings);
export const settingsStored = createAction(types.SETTINGS_STORED);
export const changeSetting = createAction(types.CHANGE_SETTING, (setting, value) => ({
  setting,
  value
}));

// Version
export const newVersionAvailable = createAction(types.NEW_VERSION_AVAILABLE);
export const dismissNewVersion = createAction(types.DISMISS_NEW_VERSION);

// Login promotion
export const promoteLogin = createAction(types.PROMOTE_LOGIN);
export const dismissLoginPromotion = createAction(types.DISMISS_LOGIN_PROMOTION);

// Notifications
export const showNotification = createAction(
  types.SHOW_NOTIFICATION,
  (message, isError = false) => ({
    message,
    isError
  })
);
export const hideNotification = createAction(types.HIDE_NOTIFICATION);
