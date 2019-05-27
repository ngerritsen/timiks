import { createSelector } from 'reselect';
import { isCube, allowInspectionTimeForPuzzle } from '../helpers/puzzle';

export const getSettings = state => state.settings;
export const getPuzzle = state => state.settings.puzzle;
export const getTheme = state => state.settings.theme;
export const getActivationDuration = state => state.settings.activationDuration;
export const shouldUseManualTimeEntry = state => state.settings.useManualTimeEntry;
export const shouldUseInspectionTime = state =>
  state.settings.useInspectionTime && allowInspectionTimeForPuzzle(state.settings.puzzle);

export const isPuzzleCube = createSelector(
  getPuzzle,
  isCube
);
