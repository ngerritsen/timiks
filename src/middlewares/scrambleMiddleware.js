import { STOP_TIMER } from '../constants';
import { setScramble } from '../actions';
import { generateScramble } from '../helpers/scramble';

const scrambleMiddleware = store => next => {
  store.dispatch(setScramble(generateScramble()));

  return action => {
    if (action.type === STOP_TIMER) {
      store.dispatch(setScramble(generateScramble()));
    }

    return next(action);
  }
}

export default scrambleMiddleware;
