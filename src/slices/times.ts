import { Time } from "../types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Partial } from "react-spring";
import { loginSucceeded, logoutSucceeded } from "./auth";

type TimesState = {
  times: Time[];
  useLocalTimes: boolean;
  requiredTimes: {
    current: boolean;
    puzzle: string | null;
    days: number | null;
  };
};

const initialState: TimesState = {
  times: [],
  useLocalTimes: true,
  requiredTimes: {
    current: true,
    puzzle: null,
    days: null,
  },
};

const { reducer, actions } = createSlice({
  name: "times",
  reducers: {
    requireTimes: (
      state,
      action: PayloadAction<{
        puzzle?: string;
        current?: boolean;
        days?: number;
      }>
    ) => {
      state.requiredTimes = {
        puzzle: action.payload.puzzle || null,
        current: Boolean(action.payload.current),
        days: action.payload.days || null,
      };
    },
    loadTimes: (
      state,
      action: PayloadAction<{
        times: Time[];
        current?: boolean;
        puzzle: string;
      }>
    ) => {
      state.times = [
        ...state.times.filter((time) =>
          action.payload.current
            ? !time.current
            : time.current || time.puzzle !== action.payload.puzzle
        ),
        ...action.payload.times.map((time) => ({ ...time, stored: true })),
      ];
    },
    saveTime: (state, action: PayloadAction<Time>) => {
      if (state.useLocalTimes) {
        state.times = [...state.times, action.payload];
      }
    },
    removeTime: (state, action: PayloadAction<string>) => {
      if (state.useLocalTimes) {
        state.times = state.times.filter((time) => time.id !== action.payload);
      }
    },
    updateTime: (
      state,
      action: PayloadAction<{ fields: Partial<Time>; id: string }>
    ) => {
      if (state.useLocalTimes) {
        state.times = state.times.map((time) =>
          time.id !== action.payload.id
            ? time
            : { ...time, ...action.payload.fields }
        );
      }
    },
    archiveTimes: (state) => {
      if (state.useLocalTimes) {
        state.times = state.times.map((time) =>
          time.current ? { ...time, current: false } : time
        );
      }
    },
    clearTimes: (state) => {
      if (state.useLocalTimes) {
        state.times = state.times.filter((time) => !time.current);
      }
    },
    loadLocalTimes: (state, action: PayloadAction<Time[]>) => {
      state.times = action.payload;
    },
    importTimes: (state, action: PayloadAction<{ times: Time[] }>) => {
      if (!state.useLocalTimes) {
        return state;
      }

      const importedIds = action.payload.times.map((time) => time.id);

      state.times = [
        ...state.times.filter((time) => !importedIds.includes(time.id)),
        ...action.payload.times,
      ];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginSucceeded, (state) => {
        state.useLocalTimes = false;
      })
      .addCase(logoutSucceeded, (state) => {
        state.useLocalTimes = true;
      });
  },
  initialState,
});

export default reducer;
export const {
  loadTimes,
  loadLocalTimes,
  saveTime,
  updateTime,
  removeTime,
  archiveTimes,
  clearTimes,
  importTimes,
  requireTimes,
} = actions;
