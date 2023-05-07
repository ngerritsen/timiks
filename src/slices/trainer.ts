import { unique } from "../helpers/general";
import { types, cases } from "../constants/trainer";
import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { EnabledCaseIds, TrainingTime, TrainingType } from "../types";

type TrainerState = {
  enabledCases: EnabledCaseIds;
  trainingType: TrainingType;
  currentCaseId: string;
  currentScramble: number;
  inRehearsal: boolean;
  rehearsedCaseIds: string[];
  times: TrainingTime[];
};

const initialState: TrainerState = {
  enabledCases: {
    OLL: [],
    PLL: [],
  },
  trainingType: types[0],
  currentCaseId: Object.keys(cases[types[0]])[0],
  currentScramble: 0,
  inRehearsal: false,
  rehearsedCaseIds: [],
  times: [],
};

const { reducer, actions } = createSlice({
  name: "trainer",
  initialState,
  reducers: {
    startRehearsal(state) {
      state.inRehearsal = true;
      state.rehearsedCaseIds = [];
    },
    stopRehearsal(state) {
      state.inRehearsal = false;
      state.rehearsedCaseIds = [];
    },
    reQueueCase(state, action: PayloadAction<string>) {
      state.rehearsedCaseIds = state.rehearsedCaseIds.filter(
        (id) => id !== action.payload
      );
    },
    loadTrainerTimes(state, action: PayloadAction<TrainingTime[]>) {
      state.times = action.payload;
    },
    saveTrainerTime(state, action: PayloadAction<TrainingTime>) {
      state.times = [...state.times, action.payload];

      if (state.inRehearsal) {
        state.rehearsedCaseIds.push(action.payload.caseId);
      }
    },
    removeTrainerTime(state, action: PayloadAction<string>) {
      state.times = state.times.filter((time) => time.id !== action.payload);
    },
    clearTrainerTimes(state, action: PayloadAction<TrainingType>) {
      state.times = state.times.filter(
        (time) => time.trainingType !== action.payload
      );
    },
    changeTrainingType(state, action: PayloadAction<TrainingType>) {
      state.trainingType = action.payload;
    },
    loadEnabledCases(state, action: PayloadAction<EnabledCaseIds>) {
      state.enabledCases = { ...state.enabledCases, ...action.payload };
    },
    nextCaseDetermined(
      state,
      action: PayloadAction<{ id: string; scramble: number }>
    ) {
      state.currentCaseId = action.payload.id;
      state.currentScramble = action.payload.scramble;
    },
    selectCase(state, action: PayloadAction<string>) {
      state.enabledCases[state.trainingType].push(action.payload);
    },
    deselectCase(state, action: PayloadAction<string>) {
      state.enabledCases[state.trainingType] = state.enabledCases[
        state.trainingType
      ].filter((id) => id !== action.payload);
    },
    selectCases(state, action: PayloadAction<string[]>) {
      state.enabledCases[state.trainingType] = unique([
        ...state.enabledCases[state.trainingType],
        ...action.payload,
      ]);
    },
    deselectCases(state, action: PayloadAction<string[]>) {
      state.enabledCases[state.trainingType] = state.enabledCases[
        state.trainingType
      ].filter((id) => !action.payload.includes(id));
    },
  },
});

export const retryCase = createAction<
  { caseId: string; trainingType: TrainingType },
  "trainer/retryCase"
>("trainer/retryCase");

export default reducer;
export const {
  startRehearsal,
  stopRehearsal,
  reQueueCase,
  loadTrainerTimes,
  saveTrainerTime,
  removeTrainerTime,
  clearTrainerTimes,
  changeTrainingType,
  loadEnabledCases,
  nextCaseDetermined,
  selectCase,
  deselectCase,
  selectCases,
  deselectCases,
} = actions;
