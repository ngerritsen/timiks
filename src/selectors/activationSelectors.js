import { PREPARATION_STAGES } from '../constants/app';

export function isReady(state) {
  return state.activation.preparationStage >= PREPARATION_STAGES;
}

export function isPreparing(state) {
  const { preparationStage } = state.activation;

  return preparationStage > -1;
}
