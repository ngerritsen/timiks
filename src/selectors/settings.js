import { createSelector } from "reselect";
import * as puzzleHelpers from "../helpers/puzzle";
import { isInTrainer } from "./router";
import { isInDarkMode } from "./theme";

export const getSettings = (state) => state.settings;
export const getPuzzle = (state) => state.settings.puzzle;
export const getArchivePuzzle = (state) => state.settings.archivePuzzle;
export const getArchiveDays = (state) => state.settings.archiveDays;
export const getTheme = (state) => state.settings.theme;

export const getActivationDuration = (state) =>
  isInTrainer(state) ? 0 : state.settings.activationDuration;

export const shouldFixGraphYAxis = (state) => state.settings.fixGraphYAxis;
export const shouldShowTimerTime = (state) => state.settings.showTimerTime;
export const shouldWarnForInspectionTime = (state) =>
  state.settings.warnForInspectionTime;
export const getDisabledArchiveGraphLines = (state) =>
  state.settings.disabledArchiveGraphLines;
export const shouldShowLatestSolveOnTop = (state) =>
  state.settings.showLatestSolveOnTop;

export const getButtonColor = (state) =>
  isInDarkMode(state)
    ? state.settings.buttonColorDarkMode || state.settings.buttonColor
    : state.settings.buttonColor;

export const getPuzzleInfo = createSelector(getPuzzle, puzzleHelpers.getPuzzle);

export const shouldUseManualTimeEntry = (state) =>
  state.settings.useManualTimeEntry && !isInTrainer(state);

export const shouldHideTrainerTimes = (state) =>
  state.settings.hideTrainerTimes;

export const shouldUseInspectionTime = (state) =>
  state.settings.useInspectionTime &&
  getPuzzleInfo(state).allowInspectionTime &&
  !isInTrainer(state);
