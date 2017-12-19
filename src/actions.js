import * as constants from './constants';

// Timer
export const incrementTime = ms => ({ type: constants.INCREMENT_TIME, ms });
export const resetTime = () => ({ type: constants.RESET_TIME });
export const startTimer = () => ({ type: constants.START_TIMER });
export const stopTimer = () => ({ type: constants.STOP_TIMER });

// Activation
export const prepareActivation = () => ({ type: constants.PREPARE_ACTIVATION });
export const fireActivation = () => ({ type: constants.FIRE_ACTIVATION });

// Scramble
export const setScramble = scramble => ({ type: constants.SET_SCRAMBLE, scramble });

// Times
export const saveTime = (id, ms, date, scramble) => ({
  type: constants.SAVE_TIME,
  id, ms, date, scramble
});

export const removeTime = id => ({ type: constants.REMOVE_TIME, id });
export const clearTimes = () => ({ type: constants.CLEAR_TIMES });
export const openSaveTimesModal = () => ({ type: constants.OPEN_SAVE_TIMES_MODAL });
export const closeSaveTimesModal = () => ({ type: constants.CLOSE_SAVE_TIMES_MODAL });
export const saveTimes = title => ({ type: constants.SAVE_TIMES, title });
export const loadTimes = (current = [], archive = []) => ({ type: constants.LOAD_TIMES, current, archive });
export const inputTimesTitle = title => ({ type: constants.INPUT_TIMES_TITLE, title });
