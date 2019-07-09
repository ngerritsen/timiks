import { getScrambleFor } from '../helpers/trainer';
import { createSelector } from 'reselect';

export const getCurrentCaseId = state => state.trainer.currentCaseId;
export const getCurrentScrambleIndex = state => state.trainer.currentScrambleIndex;
export const getCurrentScramble = createSelector(
  getCurrentCaseId,
  getCurrentScrambleIndex,
  getScrambleFor
);
