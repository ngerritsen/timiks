import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ThemeType } from "../types";

type ThemeState = {
  theme: ThemeType;
};

const initialState: ThemeState = {
  theme: "light",
};

const { reducer, actions } = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeType>) {
      state.theme = action.payload;
    },
  },
});

export default reducer;
export const { setTheme } = actions;
