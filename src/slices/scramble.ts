import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { DEFAULT_PUZZLE } from "../constants/settings";

type ScrambleState = {
  scramble: string;
  puzzle: string;
};

const initialState: ScrambleState = {
  scramble: "",
  puzzle: DEFAULT_PUZZLE,
};

const { reducer, actions, name } = createSlice({
  name: "scramble",
  initialState,
  reducers: {
    setScramble(
      state,
      action: PayloadAction<{ puzzle: string; scramble: string }>
    ) {
      state.scramble = action.payload.scramble;
      state.puzzle = action.payload.puzzle;
    },
  },
});

export default reducer;
export const refreshScramble = createAction(`${name}/refreshScramble`);
export const { setScramble } = actions;
