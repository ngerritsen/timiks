import * as actionTypes from '../constants/actionTypes';
import { changePuzzle, toggleInspectionTime, changeActivationDuration } from '../actions';
import * as settingsRepository from '../repositories/settingsRepository';

const settingsMiddleware = store => {
  const puzzle = settingsRepository.getPuzzle();
  const activationDuration = settingsRepository.getActivationDuration();
  const useInspectionTime = settingsRepository.getUseInspectionTime();

  if (puzzle) {
    store.dispatch(changePuzzle(puzzle));
  }

  if (typeof activationDuration === 'number') {
    store.dispatch(changeActivationDuration(activationDuration));
  }

  if (useInspectionTime !== store.getState().settings.useInspectionTime) {
    store.dispatch((toggleInspectionTime()));
  }

  return next => action => {
    if (action.type === actionTypes.CHANGE_PUZZLE) {
      settingsRepository.storePuzzle(action.puzzle);
    }

    if (action.type === actionTypes.CHANGE_ACTIVATION_DURATION) {
      settingsRepository.storeActivationDuration(action.activationDuration);
    }

    const result = next(action);

    if (action.type === actionTypes.TOGGLE_INSPECTION_TIME) {
      settingsRepository.storeUseInspectionTime(store.getState().settings.useInspectionTime);
    }

    return result;
  }
}

export default settingsMiddleware;
