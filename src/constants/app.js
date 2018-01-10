export const APP_ROOT_SELECTOR = '#app-root';
export const MODAL_ROOT_SELECTOR = '#modal-root';
export const FULL_SCREEN_BUTTON_ROOT_SELECTOR = '#full-screen-button';

export const ACTIVATION_THROTTLE = 1000;

export const TIMER_INTERVAL = 42;
export const SPACEBAR_KEYCODE = 32;

export const SCRAMBLE_OBFUSCATION_CHAR = '*';
export const SCRAMBLE_DELIMITER = ' ';

export const DEFAULT_PUZZLE = '3x3x3';

export const PUZZLE_STORAGE_KEY = 'puzzle';
export const CURRENT_TIMES_STORAGE_KEY = 'currentTimes';
export const ARCHIVED_TIMES_STORAGE_KEY = 'archivedTimes';
export const THEME_STORAGE_KEY = 'theme';

export const ARCHIVE_SORT_OPTIONS = [
  { label: 'Newest', value: 'date', reversed: true },
  { label: 'Title', value: 'title' },
  { label: 'Average time', value: 'average' },
  { label: 'Average of best 3', value: 'averageOfBestThree' }
];
