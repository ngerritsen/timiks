import { createSelector } from 'reselect';

import * as trainerHelpers from '../helpers/trainer';

export const getCurrentCaseId = state => state.trainer.currentCaseId;
export const getTrainingType = state => state.trainer.trainingType;
export const getEnabledCases = state => state.trainer.enabledCases;
export const getActiveEnabledCases = state => getEnabledCases(state)[getTrainingType(state)];
export const getCurrentScramble = state => state.trainer.currentScramble;
export const getTrainerTimes = state => state.trainer.times;
export const isInRehearsal = state => state.trainer.inRehearsal;
export const getRehearsedCaseIds = state => state.trainer.rehearsedCaseIds;

export const getCurrentCase = createSelector(
  getTrainingType,
  getCurrentCaseId,
  trainerHelpers.getCase
);

export const getSelectedCaseIds = createSelector(
  getTrainingType,
  getActiveEnabledCases,
  trainerHelpers.getSelectedCaseIds
);

export const getRemainingRehearsalCaseIds = createSelector(
  getSelectedCaseIds,
  getRehearsedCaseIds,
  trainerHelpers.getRemainingRehearsalCaseIds
);

export const getTrainerTimesPerCase = createSelector(
  getTrainerTimes,
  getTrainingType,
  trainerHelpers.getCasesWithTimes
);

export const getLastCase = createSelector(
  getTrainerTimes,
  getTrainingType,
  trainerHelpers.getLastCase
);

export const getGroupedSelectedCases = createSelector(
  getActiveEnabledCases,
  getTrainingType,
  (enabledCases, trainingType) =>
    trainerHelpers.groupCases(trainingType, trainerHelpers.selectCases(trainingType, enabledCases))
);
