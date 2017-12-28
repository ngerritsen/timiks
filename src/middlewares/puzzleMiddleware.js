import { CHANGE_PUZZLE } from '../constants/actionTypes';
import { changePuzzle } from '../actions';
import * as puzzleRepository from '../repositories/puzzleRepository';

const puzzleMiddleware = store => {
  const puzzle = puzzleRepository.get();

  if (puzzle) {
    store.dispatch(changePuzzle(puzzle));
  }

  return next => action => {
    if (action.type === CHANGE_PUZZLE) {
      puzzleRepository.store(action.puzzle);
    }

    return next(action);
  }
}

export default puzzleMiddleware;
