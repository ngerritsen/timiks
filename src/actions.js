import { createAction } from 'redux-actions';
import * as actionTypes from './constants/actionTypes';

// Timer
export const resetTime = createAction(actionTypes.RESET_TIME);
export const startTimer = startTime => ({ type: actionTypes.START_TIMER, startTime });
export const stopTimer = stopTime => ({ type: actionTypes.STOP_TIMER, stopTime });
export const prepareInspection = createAction(actionTypes.PREPARE_INSPECTION);
export const startInspection = startTime => ({ type: actionTypes.START_INSPECTION, startTime });
export const failInspection = createAction(actionTypes.FAIL_INSPECTION);
export const submitTimeInput = (ms, dnf, plus2) => ({
  type: actionTypes.SUBMIT_TIME_INPUT,
  ms,
  dnf,
  plus2
});
export const updateTimeInput = timeInput => ({ type: actionTypes.UPDATE_TIME_INPUT, timeInput });

// Activation
export const prepareActivation = createAction(actionTypes.PREPARE_ACTIVATION);
export const skipPreparationStage = createAction(actionTypes.SKIP_PREPARATION_STAGE);
export const resetActivation = createAction(actionTypes.RESET_ACTIVATION);
export const incrementPreparationStage = createAction(actionTypes.INCREMENT_PREPARATION_STAGE);

// Authentication
export const login = createAction(actionTypes.LOGIN);
export const loginSucceeded = (userId, displayName, email) => ({
  type: actionTypes.LOGIN_SUCCEEDED,
  userId,
  displayName,
  email
});
export const loginFailed = createAction(actionTypes.LOGIN_FAILED);
export const logout = createAction(actionTypes.LOGOUT);
export const logoutSucceeded = createAction(actionTypes.LOGOUT_SUCCEEDED);
export const logoutFailed = createAction(actionTypes.LOGOUT_FAILED);

// Scramble
export const setScramble = (scramble, puzzle) => ({
  type: actionTypes.SET_SCRAMBLE,
  scramble,
  puzzle
});
export const refreshScramble = createAction(actionTypes.REFRESH_SCRAMBLE);

// No Sleep
export const noSleepEnabled = createAction(actionTypes.NO_SLEEP_ENABLED);
export const noSleepDisabled = createAction(actionTypes.NO_SLEEP_DISABLED);

// Times
export const saveTime = time => ({ type: actionTypes.SAVE_TIME, time });
export const updateTime = (id, fields) => ({ type: actionTypes.UPDATE_TIME, id, fields });
export const loadTimes = (times = [], current, puzzle) => ({
  type: actionTypes.LOAD_TIMES,
  times,
  current,
  puzzle
});
export const loadLocalTimes = (times = []) => ({ type: actionTypes.LOAD_LOCAL_TIMES, times });
export const removeTime = id => ({ type: actionTypes.REMOVE_TIME, id });
export const clearTimes = createAction(actionTypes.CLEAR_TIMES);
export const archiveTimes = createAction(actionTypes.ARCHIVE_TIMES);
export const storedLocalTimes = createAction(actionTypes.STORED_LOCAL_TIMES);
export const requireTimes = (current, puzzle) => ({
  type: actionTypes.REQUIRE_TIMES,
  current,
  puzzle
});

// Settings
export const loadSettings = createAction(actionTypes.LOAD_SETTINGS, settings => settings);
export const settingsStored = createAction(actionTypes.SETTINGS_STORED);
export const changeSetting = createAction(actionTypes.CHANGE_SETTING, (setting, value) => ({
  setting,
  value
}));

// Version
export const newVersionAvailable = createAction(actionTypes.NEW_VERSION_AVAILABLE);
export const dismissNewVersion = createAction(actionTypes.DISMISS_NEW_VERSION);

// Login promotion
export const promoteLogin = createAction(actionTypes.PROMOTE_LOGIN);
export const dismissLoginPromotion = createAction(actionTypes.DISMISS_LOGIN_PROMOTION);

// Notifications
export const showNotification = (message, isError = false) => ({
  type: actionTypes.SHOW_NOTIFICATION,
  message,
  isError
});
export const hideNotification = createAction(actionTypes.HIDE_NOTIFICATION);
