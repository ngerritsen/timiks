import * as actionTypes from './constants/actionTypes';

// Timer
export const resetTime = () => ({ type: actionTypes.RESET_TIME });
export const startTimer = startTime => ({ type: actionTypes.START_TIMER, startTime });
export const stopTimer = () => ({ type: actionTypes.STOP_TIMER });
export const prepareInspection = () => ({ type: actionTypes.PREPARE_INSPECTION });
export const startInspection = startTime => ({ type: actionTypes.START_INSPECTION, startTime });
export const failInspection = () => ({ type: actionTypes.FAIL_INSPECTION });
export const submitTimeInput = () => ({ type: actionTypes.SUBMIT_TIME_INPUT });
export const updateTimeInput = timeInput => ({ type: actionTypes.UPDATE_TIME_INPUT, timeInput });

// Activation
export const prepareActivation = () => ({ type: actionTypes.PREPARE_ACTIVATION });
export const skipPreparationStage = () => ({ type: actionTypes.SKIP_PREPARATION_STAGE });
export const resetActivation = () => ({ type: actionTypes.RESET_ACTIVATION });
export const incrementPreparationStage = () => ({ type: actionTypes.INCREMENT_PREPARATION_STAGE });

// Scramble
export const setScramble = scramble => ({ type: actionTypes.SET_SCRAMBLE, scramble });
export const refreshScramble = () => ({ type: actionTypes.REFRESH_SCRAMBLE });

// Times
export const saveTime = (id, ms, date, scramble, puzzle, dnf = false, plus2 = false) => ({
  type: actionTypes.SAVE_TIME,
  id, ms, date, scramble, puzzle, dnf, plus2
});
export const updateTime = (id, fields) => ({ type: actionTypes.UPDATE_TIME, id, fields });
export const loadTimes = (current = []) => ({ type: actionTypes.LOAD_TIMES, current });
export const removeTime = id => ({ type: actionTypes.REMOVE_TIME, id });
export const clearTimes = () => ({ type: actionTypes.CLEAR_TIMES });

// Archive
export const archiveCurrentTimes = () => ({ type: actionTypes.ARCHIVE_CURRENT_TIMES });
export const inputTimesTitle = title => ({ type: actionTypes.INPUT_ARCHIVE_TITLE, title });
export const archive = (id, times, puzzle) => ({ type: actionTypes.ARCHIVE, id, times, puzzle });
export const expandArchiveItem = id => ({ type: actionTypes.EXPAND_ARCHIVE_ITEM, id });
export const collapseArchiveItem = id => ({ type: actionTypes.COLLAPSE_ARCHIVE_ITEM, id });
export const removeArchiveItem = id => ({ type: actionTypes.REMOVE_ARCHIVE_ITEM, id });
export const sortArchive = sortBy => ({ type: actionTypes.SORT_ARCHIVE, sortBy });
export const filterArchive = puzzle => ({ type: actionTypes.FILTER_ARCHIVE, puzzle });
export const changeImportInput = value => ({ type: actionTypes.CHANGE_IMPORT_INPUT, value });
export const importArchive = archive => ({ type: actionTypes.IMPORT_ARCHIVE, archive });
export const loadArchive = (archive = []) => ({ type: actionTypes.LOAD_ARCHIVE, archive });

// Settings
export const loadSettings = settings => ({ type: actionTypes.LOAD_SETTINGS, settings });
export const toggleManualTimeEntry = () => ({ type: actionTypes.TOGGLE_MANUAL_TIME_ENTRY });
export const changePuzzle = puzzle => ({ type: actionTypes.CHANGE_PUZZLE, puzzle });
export const changeTheme = theme => ({ type: actionTypes.CHANGE_THEME, theme });
export const toggleInspectionTime = theme => ({ type: actionTypes.TOGGLE_INSPECTION_TIME, theme });
export const changeActivationDuration = activationDuration => ({
  type: actionTypes.CHANGE_ACTIVATION_DURATION,
  activationDuration
});

// Modal
export const openModal = id => ({ type: actionTypes.OPEN_MODAL, id });
export const closeModal = () => ({ type: actionTypes.CLOSE_MODAL });
