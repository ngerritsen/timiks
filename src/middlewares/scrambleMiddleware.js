import { STOP_TIMER, CHANGE_PUZZLE, REFRESH_SCRAMBLE } from '../constants/actionTypes';
import { setScramble } from '../actions';
import { generateScramble } from '../helpers/scramble';

const scrambleMiddleware = store => next => {
  dispatchScramble(store)

  return action => {
    const result = next(action);

    if ([STOP_TIMER, CHANGE_PUZZLE, REFRESH_SCRAMBLE].includes(action.type)) {
      dispatchScramble(store)
    }

    return result;
  }
}

function dispatchScramble(store) {
  const scramble = generateScramble(store.getState().settings.puzzle);

  store.dispatch(setScramble(scramble));
}

export default scrambleMiddleware;
