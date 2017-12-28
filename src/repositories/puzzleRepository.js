import { PUZZLE_STORAGE_KEY } from '../constants/app';

export function store(puzzle) {
  localStorage.setItem(PUZZLE_STORAGE_KEY, puzzle);
}

export function get() {
  return localStorage.getItem(PUZZLE_STORAGE_KEY) || null;
}
