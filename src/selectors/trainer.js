import { createSelector } from 'reselect';

import { groupCases, selectCases, getCasesWithTimes } from '../helpers/trainer';

export const getCurrentCaseId = state => state.trainer.currentCaseId;
export const getTrainingType = state => state.trainer.trainingType;
export const getEnabledCases = state => state.trainer.enabledCases;
export const getActiveEnabledCases = state => getEnabledCases(state)[getTrainingType(state)];
export const getCurrentScramble = state => state.trainer.currentScramble;
export const getTrainerTimes = state => state.trainer.times;

export const getTrainerTimesPerCase = createSelector(
  getTrainerTimes,
  getTrainingType,
  getCasesWithTimes
);

export const getGroupedSelectedCases = createSelector(
  getActiveEnabledCases,
  getTrainingType,
  (enabledCases, trainingType) => groupCases(trainingType, selectCases(trainingType, enabledCases))
);
