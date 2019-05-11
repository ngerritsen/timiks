import { createSelector } from 'reselect';
import { isCube } from '../helpers/puzzle';

export function getSettings(state) {
  return state.settings;
}

export function getPuzzle(state) {
  return state.settings.puzzle;
}

export function getTheme(state) {
  return state.settings.theme;
}

export function shouldUseManualTimeEntry(state) {
  return state.settings.useManualTimeEntry;
}

export function shouldUseInspectionTime(state) {
  return state.settings.useInspectionTime;
}

export const isPuzzleCube = createSelector(
  getPuzzle,
  isCube
);
