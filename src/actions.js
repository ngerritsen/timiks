import * as actionTypes from './constants/actionTypes';
import { SCRAMBLE_REQUESTED } from './constants/actionTypes';

// Timer
export const resetTime = () => ({ type: actionTypes.RESET_TIME });
export const startTimer = startTime => ({ type: actionTypes.START_TIMER, startTime });
export const stopTimer = stopTime => ({ type: actionTypes.STOP_TIMER, stopTime });
export const prepareInspection = () => ({ type: actionTypes.PREPARE_INSPECTION });
export const startInspection = startTime => ({ type: actionTypes.START_INSPECTION, startTime });
export const failInspection = () => ({ type: actionTypes.FAIL_INSPECTION });
export const submitTimeInput = (ms, dnf, plus2) => ({
  type: actionTypes.SUBMIT_TIME_INPUT,
  ms,
  dnf,
  plus2
});
export const updateTimeInput = timeInput => ({ type: actionTypes.UPDATE_TIME_INPUT, timeInput });

// Activation
export const prepareActivation = () => ({ type: actionTypes.PREPARE_ACTIVATION });
export const skipPreparationStage = () => ({ type: actionTypes.SKIP_PREPARATION_STAGE });
export const resetActivation = () => ({ type: actionTypes.RESET_ACTIVATION });
export const incrementPreparationStage = () => ({ type: actionTypes.INCREMENT_PREPARATION_STAGE });

// Authentication
export const login = () => ({ type: actionTypes.LOGIN });
export const loginSucceeded = (userId, displayName, email) => ({
  type: actionTypes.LOGIN_SUCCEEDED,
  userId,
  displayName,
  email
});
export const loginFailed = () => ({ type: actionTypes.LOGIN_FAILED });
export const logout = () => ({ type: actionTypes.LOGOUT });
export const logoutSucceeded = () => ({ type: actionTypes.LOGOUT_SUCCEEDED });
export const logoutFailed = () => ({ type: actionTypes.LOGOUT_FAILED });

// Scramble
export const scrambleRequested = () => ({ type: SCRAMBLE_REQUESTED });
export const setScramble = scramble => ({ type: actionTypes.SET_SCRAMBLE, scramble });
export const refreshScramble = () => ({ type: actionTypes.REFRESH_SCRAMBLE });

// No Sleep
export const noSleepEnabled = () => ({ type: actionTypes.NO_SLEEP_ENABLED });
export const noSleepDisabled = () => ({ type: actionTypes.NO_SLEEP_DISABLED });

// Times
export const saveTime = time => ({ type: actionTypes.SAVE_TIME, time });
export const updateTime = (id, fields) => ({ type: actionTypes.UPDATE_TIME, id, fields });
export const loadTimes = (times = []) => ({ type: actionTypes.LOAD_TIMES, times });
export const loadLocalTimes = (times = []) => ({ type: actionTypes.LOAD_LOCAL_TIMES, times });
export const removeTime = id => ({ type: actionTypes.REMOVE_TIME, id });
export const clearTimes = () => ({ type: actionTypes.CLEAR_TIMES });
export const archiveTimes = () => ({ type: actionTypes.ARCHIVE_TIMES });
export const storedLocalTimes = () => ({ type: actionTypes.STORED_LOCAL_TIMES });
export const storedTime = id => ({ type: actionTypes.STORED_TIME, id });
export const storedTimes = ids => ({ type: actionTypes.STORED_TIMES, ids });
export const removedTime = id => ({ type: actionTypes.REMOVED_TIME, id });
export const archivedTimes = ids => ({ type: actionTypes.ARCHIVED_TIMES, ids });
export const clearedTimes = ids => ({ type: actionTypes.CLEARED_TIMES, ids });

// Settings
export const loadSettings = settings => ({ type: actionTypes.LOAD_SETTINGS, settings });
export const settingsStored = () => ({ type: actionTypes.SETTINGS_STORED });
export const toggleManualTimeEntry = () => ({ type: actionTypes.TOGGLE_MANUAL_TIME_ENTRY });
export const changePuzzle = puzzle => ({ type: actionTypes.CHANGE_PUZZLE, puzzle });
export const changeTheme = theme => ({ type: actionTypes.CHANGE_THEME, theme });
export const toggleInspectionTime = theme => ({ type: actionTypes.TOGGLE_INSPECTION_TIME, theme });
export const changeActivationDuration = activationDuration => ({
  type: actionTypes.CHANGE_ACTIVATION_DURATION,
  activationDuration
});
