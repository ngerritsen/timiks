import { PREPARATION_STAGES } from '../constants/app';

export function isReady(state) {
  return getPreparationStage(state) >= PREPARATION_STAGES;
}

export function isPreparing(state) {
  return getPreparationStage(state) > -1;
}

export function getPreparationStage(state) {
  return state.activation.preparationStage;
}

export function isPreparingForInspection(state) {
  return state.activation.preparingForInspection;
}
