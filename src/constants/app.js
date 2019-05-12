export const APP_ROOT_SELECTOR = '#app-root';
export const MODAL_ROOT_SELECTOR = '#modal-root';
export const FULL_SCREEN_MASK_ROOT_SELECTOR = '#full-screen-mask';

export const INSPECTION_TIME = 15000;
export const TIMER_UPDATE_RATE = 10;

export const PREPARATION_STAGES = 3;

export const ACTIVATION_DURATION_OPTIONS = [
  { label: 'none', value: 0 },
  { label: '300ms', value: 300 },
  { label: '550ms', value: 550 },
  { label: '1s', value: 1000 }
];

export const DEFAULT_ACTIVATION_DURATION = 300;

export const SCRAMBLE_DELIMITER = ' ';

export const AVAILABLE_STATS = [
  { name: 'ao5', size: 5, deviation: 1, color: 'green' },
  { name: 'ao12', size: 12, deviation: 1, color: 'yellow' },
  { name: 'ao25', size: 25, deviation: 2, color: 'orange' },
  { name: 'ao50', size: 50, deviation: 3, color: 'red' },
  { name: 'ao100', size: 100, deviation: 5, color: 'purple' },
  { name: 'mo3', size: 3, deviation: 0, color: 'grey' }
];

export const DEFAULT_PUZZLE = '3x3x3';

export const SETTINGS_STORAGE_KEY = 'settings';
export const CURRENT_TIMES_STORAGE_KEY = 'currentTimes';
export const ARCHIVED_TIMES_STORAGE_KEY = 'archivedTimes';
