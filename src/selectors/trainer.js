import { createSelector } from 'reselect';

import * as oll from '../constants/oll';
import { getScrambleFor, groupCases, selectCases } from '../helpers/trainer';

export const getCurrentCaseId = state => state.trainer.currentCaseId;
export const getEnabledCases = state => state.trainer.enabledCases;
export const getCurrentScrambleIndex = state => state.trainer.currentScrambleIndex;

export const getGroupedSelectedCases = createSelector(
  getEnabledCases,
  enabledIds => groupCases(oll.groups, selectCases(oll.cases, enabledIds))
);

export const getCurrentScramble = createSelector(
  getCurrentCaseId,
  getCurrentScrambleIndex,
  getScrambleFor
);
