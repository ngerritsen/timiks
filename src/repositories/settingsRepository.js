import { PUZZLE_STORAGE_KEY, USE_INSPECTION_TIME_STORAGE_KEY } from '../constants/app';

export function storePuzzle(puzzle) {
  localStorage.setItem(PUZZLE_STORAGE_KEY, puzzle);
}

export function getPuzzle() {
  return localStorage.getItem(PUZZLE_STORAGE_KEY) || null;
}

export function storeUseInspectionTime(useInspectionTime) {
  localStorage.setItem(USE_INSPECTION_TIME_STORAGE_KEY, JSON.stringify(useInspectionTime));
}

export function getUseInspectionTime() {
  const rawUseInspectionTime = localStorage.getItem(USE_INSPECTION_TIME_STORAGE_KEY);

  return rawUseInspectionTime ? JSON.parse(rawUseInspectionTime) : false;
}
