import * as actionTypes from './constants/actionTypes';

// Timer
export const resetTime = () => ({ type: actionTypes.RESET_TIME });
export const startTimer = startTime => ({ type: actionTypes.START_TIMER, startTime });
export const stopTimer = () => ({ type: actionTypes.STOP_TIMER });
export const showScrambleDetails = () => ({ type: actionTypes.SHOW_SCRAMBLE_DETAILS });
export const hideScrambleDetails = () => ({ type: actionTypes.HIDE_SCRAMBLE_DETAILS });
export const prepareInspection = () => ({ type: actionTypes.PREPARE_INSPECTION });
export const startInspection = startTime => ({ type: actionTypes.START_INSPECTION, startTime });
export const failInspection = () => ({ type: actionTypes.FAIL_INSPECTION });

// Activation
export const prepareActivation = () => ({ type: actionTypes.PREPARE_ACTIVATION });
export const resetActivation = () => ({ type: actionTypes.RESET_ACTIVATION });
export const incrementPreparationStage = () => ({ type: actionTypes.INCREMENT_PREPARATION_STAGE });

// Scramble
export const setScramble = scramble => ({ type: actionTypes.SET_SCRAMBLE, scramble });

// Times
export const saveTime = (id, ms, date, scramble, puzzle, dnf = false, plus2 = false) => ({
  type: actionTypes.SAVE_TIME,
  id, ms, date, scramble, puzzle, dnf, plus2
});
export const updateTime = (id, fields) => ({ type: actionTypes.UPDATE_TIME, id, fields });
export const loadTimes = (current = [], archive = []) => ({ type: actionTypes.LOAD_TIMES, current, archive });
export const removeTime = id => ({ type: actionTypes.REMOVE_TIME, id });
export const clearTimes = () => ({ type: actionTypes.CLEAR_TIMES });

export const showTimeDetails = id => ({ type: actionTypes.SHOW_TIME_DETAILS, id });
export const hideTimeDetails = id => ({ type: actionTypes.HIDE_TIME_DETAILS, id });

// Archive
export const openArchiveModal = () => ({ type: actionTypes.OPEN_ARCHIVE_MODAL });
export const closeArchiveModal = () => ({ type: actionTypes.CLOSE_ARCHIVE_MODAL });
export const archiveCurrentTimes = () => ({ type: actionTypes.ARCHIVE_CURRENT_TIMES });
export const inputTimesTitle = title => ({ type: actionTypes.INPUT_ARCHIVE_TITLE, title });
export const archive = (id, times, puzzle) => ({ type: actionTypes.ARCHIVE, id, times, puzzle });
export const expandArchiveItem = id => ({ type: actionTypes.EXPAND_ARCHIVE_ITEM, id });
export const collapseArchiveItem = id => ({ type: actionTypes.COLLAPSE_ARCHIVE_ITEM, id });
export const removeArchiveItem = id => ({ type: actionTypes.REMOVE_ARCHIVE_ITEM, id });
export const sortArchive = sortBy => ({ type: actionTypes.SORT_ARCHIVE, sortBy });
export const filterArchive = puzzle => ({ type: actionTypes.FILTER_ARCHIVE, puzzle });

// Settings
export const changePuzzle = puzzle => ({ type: actionTypes.CHANGE_PUZZLE, puzzle });
export const changeTheme = theme => ({ type: actionTypes.CHANGE_THEME, theme });
export const toggleInspectionTime = theme => ({ type: actionTypes.TOGGLE_INSPECTION_TIME, theme });
export const openSettings = () => ({ type: actionTypes.OPEN_SETTINGS });
export const closeSettings = () => ({ type: actionTypes.CLOSE_SETTINGS });

// Stats info
export const showStatsInfo = () => ({ type: actionTypes.SHOW_STATS_INFO });
export const hideStatsInfo = () => ({ type: actionTypes.HIDE_STATS_INFO });
