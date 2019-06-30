import { SETTINGS_STORAGE_KEY } from '../constants/storage';

export function store(settings) {
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
}

export function get() {
  const rawSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);

  try {
    return JSON.parse(rawSettings);
  } catch (e) {
    return {};
  }
}
