import * as actionTypes from './constants/actionTypes';

// Timer
export const incrementTime = ms => ({ type: actionTypes.INCREMENT_TIME, ms });
export const resetTime = () => ({ type: actionTypes.RESET_TIME });
export const startTimer = () => ({ type: actionTypes.START_TIMER });
export const stopTimer = () => ({ type: actionTypes.STOP_TIMER });

// Activation
export const prepareActivation = () => ({ type: actionTypes.PREPARE_ACTIVATION });
export const fireActivation = () => ({ type: actionTypes.FIRE_ACTIVATION });

// Scramble
export const setScramble = scramble => ({ type: actionTypes.SET_SCRAMBLE, scramble });

// Times
export const saveTime = (id, ms, date, scramble) => ({
  type: actionTypes.SAVE_TIME,
  id, ms, date, scramble
});

export const removeTime = id => ({ type: actionTypes.REMOVE_TIME, id });
export const clearTimes = () => ({ type: actionTypes.CLEAR_TIMES });
export const openSaveTimesModal = () => ({ type: actionTypes.OPEN_SAVE_TIMES_MODAL });
export const closeSaveTimesModal = () => ({ type: actionTypes.CLOSE_SAVE_TIMES_MODAL });
export const saveTimes = title => ({ type: actionTypes.SAVE_TIMES, title });
export const loadTimes = (current = [], archive = []) => ({ type: actionTypes.LOAD_TIMES, current, archive });
export const inputTimesTitle = title => ({ type: actionTypes.INPUT_TIMES_TITLE, title });

export const openSettings = () => ({ type: actionTypes.OPEN_SETTINGS });
export const closeSettings = () => ({ type: actionTypes.CLOSE_SETTINGS });
export const changePuzzle = puzzle => ({ type: actionTypes.CHANGE_PUZZLE, puzzle });