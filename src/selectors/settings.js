import { createSelector } from 'reselect';
import * as puzzleHelpers from '../helpers/puzzle';

export const getSettings = state => state.settings;
export const getPuzzle = state => state.settings.puzzle;
export const getTheme = state => state.settings.theme;
export const getActivationDuration = state => state.settings.activationDuration;
export const shouldUseManualTimeEntry = state => state.settings.useManualTimeEntry;

export const getPuzzleInfo = createSelector(
  getPuzzle,
  puzzleHelpers.getPuzzle
);

export const shouldUseInspectionTime = state =>
  state.settings.useInspectionTime && getPuzzleInfo(state).allowInspectionTime;
