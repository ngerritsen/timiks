import { createSelector } from "reselect";

import * as trainerHelpers from "../helpers/trainer";
import { RootState } from "../store";

export const getCurrentCaseId = (state: RootState) =>
  state.trainer.currentCaseId;

export const getTrainingType = (state: RootState) => state.trainer.trainingType;
export const getEnabledCases = (state: RootState) => state.trainer.enabledCases;
export const getActiveEnabledCases = (state: RootState) =>
  getEnabledCases(state)[getTrainingType(state)];
export const getCurrentScramble = (state: RootState) =>
  state.trainer.currentScramble;

export const getTrainerTimes = (state: RootState) => state.trainer.times;
export const isInRehearsal = (state: RootState) => state.trainer.inRehearsal;
export const getRehearsedCaseIds = (state: RootState) =>
  state.trainer.rehearsedCaseIds;

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

export const getAvailableCaseIds = createSelector(
  getTrainingType,
  trainerHelpers.getAvailableCaseIds
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

export const isQueued = createSelector(
  getLastCase,
  getRehearsedCaseIds,
  (lastCase, rehearsedCaseIds) =>
    Boolean(lastCase) && !rehearsedCaseIds.includes(lastCase.id)
);

export const getGroupedSelectedCases = createSelector(
  getActiveEnabledCases,
  getTrainingType,
  (enabledCases, trainingType) =>
    trainerHelpers.groupCases(
      trainingType,
      trainerHelpers.selectCases(trainingType, enabledCases)
    )
);
