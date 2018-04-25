import { CHANGE_PUZZLE, TOGGLE_INSPECTION_TIME } from '../constants/actionTypes';
import { changePuzzle, toggleInspectionTime } from '../actions';
import * as settingsRepository from '../repositories/settingsRepository';

const settingsMiddleware = store => {
  const puzzle = settingsRepository.getPuzzle();
  const useInspectionTime = settingsRepository.getUseInspectionTime();

  if (puzzle) {
    store.dispatch(changePuzzle(puzzle));
  }

  if (useInspectionTime !== store.getState().settings.useInspectionTime) {
    store.dispatch((toggleInspectionTime()));
  }

  return next => action => {
    if (action.type === CHANGE_PUZZLE) {
      settingsRepository.storePuzzle(action.puzzle);
    }

    const result = next(action);

    if (action.type === TOGGLE_INSPECTION_TIME) {
      settingsRepository.storeUseInspectionTime(store.getState().settings.useInspectionTime);
    }

    return result;
  }
}

export default settingsMiddleware;
