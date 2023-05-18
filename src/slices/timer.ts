import { saveTime } from "../slices/times";
import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { PREPARATION_STAGES } from "../constants/timer";
import { TimeInputData } from "../types";

type TimerState = {
  startTime: number;
  stopTime: number;
  inspectionStartTime: number;
  stopped: boolean;
  inspecting: boolean;
  lastTimeId: string;
  isTraining: boolean;
  preparationStage: number;
  preparingForInspection: boolean;
  timeInput: string;
};

const initialState: TimerState = {
  startTime: 0,
  stopTime: 0,
  inspectionStartTime: 0,
  stopped: true,
  inspecting: false,
  lastTimeId: "",
  isTraining: false,
  preparationStage: -1,
  preparingForInspection: false,
  timeInput: "",
};

export const submitTimeInput = createAction<
  TimeInputData,
  "timer/submitTimeInput"
>("timer/submitTimeInput");

const { reducer, actions } = createSlice({
  name: "timer",
  initialState,
  reducers: {
    prepareInspection: (state) => {
      state.preparingForInspection = true;
    },
    startInspection: (state, action: PayloadAction<number>) => {
      state.preparingForInspection = false;
      state.inspectionStartTime = action.payload;
      state.inspecting = true;
    },
    failInspection: () => initialState,
    incrementPreparationState: (state) => {
      state.preparationStage += 1;
    },
    skipPreparationStage: (state) => {
      state.preparationStage = PREPARATION_STAGES;
    },
    prepareActivation: (state) => {
      state.preparationStage = 0;
    },
    resetActivation: (state) => {
      state.preparationStage = -1;
    },
    startTimer: (state, action) => {
      state.startTime = action.payload;
      state.stopped = false;
      state.stopTime = 0;
      state.inspecting = false;
    },
    stopTimer: (state, action: PayloadAction<number>) => {
      state.stopped = true;
      state.stopTime = action.payload;
    },
    resetTime: (state) => {
      state.startTime = 0;
      state.stopTime = 0;
    },
    setIsTraining: (state, action: PayloadAction<boolean>) => {
      state.isTraining = action.payload;
    },
    updateTimeInput: (state) => {
      state.timeInput = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveTime, (state, action) => {
        state.startTime = 0;
        state.inspectionStartTime = 0;
        state.lastTimeId = action.payload.id;
      })
      .addCase(submitTimeInput, (state) => {
        state.timeInput = "";
      });
  },
});

export default reducer;
export const {
  prepareInspection,
  startInspection,
  failInspection,
  incrementPreparationState,
  skipPreparationStage,
  prepareActivation,
  resetActivation,
  startTimer,
  stopTimer,
  resetTime,
  updateTimeInput,
  setIsTraining,
} = actions;
