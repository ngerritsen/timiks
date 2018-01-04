import { THEME_STORAGE_KEY } from '../constants/app';

export function store(theme) {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export function get() {
  return localStorage.getItem(THEME_STORAGE_KEY) || null;
}
