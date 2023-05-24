import { createSelector } from "reselect";
import * as puzzleHelpers from "../helpers/puzzle";
import { isTraining } from "./timer";
import { RootState } from "../store";

export const getSettings = (state: RootState) => state.settings;
export const getPuzzle = (state: RootState) => state.settings.puzzle;
export const getArchiveDays = (state: RootState) => state.settings.archiveDays;
export const getTheme = (state: RootState) => state.settings.theme;
export const getTimeEntryShorthandPrecision = (state: RootState) =>
  state.settings.timeEntryShorthandPrecision;

export const getArchivePuzzle = (state: RootState) =>
  state.settings.archivePuzzle;

export const getActivationDuration = (state: RootState) =>
  isTraining(state) ? 0 : state.settings.activationDuration;

export const shouldFixGraphYAxis = (state: RootState) =>
  state.settings.fixGraphYAxis;

export const shouldShowTimerTime = (state: RootState) =>
  state.settings.showTimerTime;

export const shouldWarnForInspectionTime = (state: RootState) =>
  state.settings.warnForInspectionTime;

export const getDisabledArchiveGraphLines = (state: RootState) =>
  state.settings.disabledArchiveGraphLines;

export const shouldShowLatestSolveOnTop = (state: RootState) =>
  state.settings.showLatestSolveOnTop;

export const getButtonColor = (state: RootState, isInDarkMode: boolean) =>
  isInDarkMode
    ? state.settings.buttonColorDarkMode || state.settings.buttonColor
    : state.settings.buttonColor;

export const getPuzzleInfo = createSelector(getPuzzle, puzzleHelpers.getPuzzle);

export const shouldUseManualTimeEntry = (state: RootState) =>
  state.settings.useManualTimeEntry && !isTraining(state);

export const shouldHideTrainerTimes = (state: RootState) =>
  state.settings.hideTrainerTimes;

export const shouldUseInspectionTime = (state: RootState) =>
  state.settings.useInspectionTime &&
  getPuzzleInfo(state).allowInspectionTime &&
  !isTraining(state);
