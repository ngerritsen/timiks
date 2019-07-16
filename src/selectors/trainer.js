import { createSelector } from 'reselect';

import { cases, categories } from '../constants/trainer';
import { groupCases, selectCases } from '../helpers/trainer';

export const getCurrentCaseId = state => state.trainer.currentCaseId;
export const getTrainingType = state => state.trainer.trainingType;
export const getEnabledCases = state => state.trainer.enabledCases;
export const getActiveEnabledCases = state => getEnabledCases(state)[getTrainingType(state)];
export const getCurrentScramble = state => state.trainer.currentScramble;

export const getGroupedSelectedCases = createSelector(
  getActiveEnabledCases,
  getTrainingType,
  (enabledCases, type) => groupCases(categories[type], selectCases(cases[type], enabledCases))
);
