import * as settingsConstants from "../constants/settings";
import {
  DEFAULT_ACTIVATION_DURATION,
  DEFAULT_ARCHIVE_DAYS,
} from "../constants/settings";
import { ThemeSetting } from "../types";
import { Color } from "../theme";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type SettingsState = {
  puzzle: string;
  archivePuzzle: string;
  archiveDays: number;
  useInspectionTime: boolean;
  useManualTimeEntry: boolean;
  warnForInspectionTime: boolean;
  theme: ThemeSetting;
  buttonColor: Color;
  buttonColorDarkMode: Color | "";
  activationDuration: number;
  showTimerTime: boolean;
  fixGraphYAxis: boolean;
  hideTrainerTimes: boolean;
  showLatestSolveOnTop: boolean;
  disabledArchiveGraphLines: string[];
  timeEntryShorthandPrecision: number;
};

const initialState: SettingsState = {
  puzzle: settingsConstants.DEFAULT_PUZZLE,
  archivePuzzle: settingsConstants.DEFAULT_PUZZLE,
  archiveDays: DEFAULT_ARCHIVE_DAYS,
  useInspectionTime: false,
  useManualTimeEntry: false,
  warnForInspectionTime: true,
  theme: "auto",
  buttonColor: settingsConstants.DEFAULT_BUTTON_COLOR,
  buttonColorDarkMode: "",
  activationDuration: DEFAULT_ACTIVATION_DURATION,
  showTimerTime: true,
  showLatestSolveOnTop: false,
  fixGraphYAxis: false,
  hideTrainerTimes: false,
  disabledArchiveGraphLines: [],
  timeEntryShorthandPrecision: 3,
};

const { reducer, actions } = createSlice({
  name: "settings",
  initialState,
  reducers: {
    loadSettings: (state, action: PayloadAction<Partial<SettingsState>>) => ({
      ...state,
      ...action.payload,
      archiveDays: DEFAULT_ARCHIVE_DAYS,
    }),
    changeSetting<T extends keyof SettingsState>(
      state: SettingsState,
      action: PayloadAction<{ setting: T; value: SettingsState[T] }>
    ) {
      state[action.payload.setting] = action.payload.value;
    },
  },
});

export default reducer;
export const { loadSettings, changeSetting } = actions;
