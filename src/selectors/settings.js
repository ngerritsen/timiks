import { createSelector } from 'reselect';
import * as puzzleHelpers from '../helpers/puzzle';

export const getSettings = state => state.settings;
export const getPuzzle = state => state.settings.puzzle;
export const getArchivePuzzle = state => state.settings.archivePuzzle;
export const getArchiveDays = state => state.settings.archiveDays;
export const getTheme = state => state.settings.theme;
export const getActivationDuration = state => state.settings.activationDuration;
export const shouldUseManualTimeEntry = state => state.settings.useManualTimeEntry;
export const shouldShowTimerTime = state => state.settings.showTimerTime;
export const isInDarkMode = state => getTheme(state) === 'dark';
export const getButtonColor = state =>
  isInDarkMode(state)
    ? state.settings.buttonColorDarkMode || state.settings.buttonColor
    : state.settings.buttonColor;
export const getPuzzleInfo = createSelector(
  getPuzzle,
  puzzleHelpers.getPuzzle
);

export const shouldUseInspectionTime = state =>
  state.settings.useInspectionTime && getPuzzleInfo(state).allowInspectionTime;
