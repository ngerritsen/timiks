import { PREPARATION_STAGES } from '../constants/app';

export const isReady = state => getPreparationStage(state) >= PREPARATION_STAGES;
export const isPreparing = state => getPreparationStage(state) > -1;
export const getPreparationStage = state => state.activation.preparationStage;
export const isPreparingForInspection = state => state.activation.preparingForInspection;
