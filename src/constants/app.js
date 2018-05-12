export const APP_ROOT_SELECTOR = '#app-root';
export const MODAL_ROOT_SELECTOR = '#modal-root';
export const FULL_SCREEN_MASK_ROOT_SELECTOR = '#full-screen-mask';

export const PREPARATION_STAGES = 3;

export const ACTIVATION_DURATION_OPTIONS = [
  { label: 'none', value: 0 },
  { label: '300ms', value: 300 },
  { label: '550ms', value: 550 },
  { label: '1s', value: 1000 },
];

export const DEFAULT_ACTIVATION_DURATION = 300;

export const INSPECTION_TIME = 15000;

export const TIMER_INTERVAL = 63;

export const SCRAMBLE_OBFUSCATION_CHAR = '*';
export const SCRAMBLE_DELIMITER = ' ';

export const DEFAULT_PUZZLE = '3x3x3';

export const SETTINGS_STORAGE_KEY = 'settings';
export const CURRENT_TIMES_STORAGE_KEY = 'currentTimes';
export const ARCHIVED_TIMES_STORAGE_KEY = 'archivedTimes';

export const ARCHIVE_SORT_OPTIONS = [
  { label: 'Newest', value: 'date', reversed: true },
  { label: 'Title', value: 'title' },
  { label: 'ao5', value: 'ao5' },
  { label: 'ao12', value: 'ao12' },
  { label: 'ao25', value: 'ao25' },
  { label: 'ao50', value: 'ao50' },
  { label: 'ao100', value: 'ao100' },
  { label: 'mo3', value: 'mo3' }
];
