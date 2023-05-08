import { RootState } from "../store";

export const getScramble = (state: RootState) => state.scramble.scramble;
export const getPuzzleForScramble = (state: RootState) => state.scramble.puzzle;
