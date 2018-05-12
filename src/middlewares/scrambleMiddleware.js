import * as actionTypes from '../constants/actionTypes';
import { setScramble } from '../actions';
import { generateScramble } from '../helpers/scramble';

const RESCRAMBLE_ON = [
  actionTypes.STOP_TIMER,
  actionTypes.CHANGE_PUZZLE,
  actionTypes.REFRESH_SCRAMBLE,
  actionTypes.SUBMIT_TIME_INPUT
];

const scrambleMiddleware = store => next => {
  dispatchScramble(store)

  return action => {
    const result = next(action);

    if (RESCRAMBLE_ON.includes(action.type)) {
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
