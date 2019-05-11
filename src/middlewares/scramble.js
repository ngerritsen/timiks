import * as actionTypes from '../constants/actionTypes';
import { setScramble } from '../actions';
import { generateScramble } from '../helpers/scramble';
import { getPuzzle } from '../selectors/settings';

const workerPathEl = document.querySelector('[data-scramble-worker-path]');
const workerPath = workerPathEl.getAttribute('data-scramble-worker-path');
const scrambleWorker = new Worker(workerPath);

const RESCRAMBLE_ON = [
  actionTypes.STOP_TIMER,
  actionTypes.CHANGE_PUZZLE,
  actionTypes.REFRESH_SCRAMBLE,
  actionTypes.SUBMIT_TIME_INPUT
];

const scramble = store => next => {
  scrambleWorker.addEventListener('message', (event) => {
    store.dispatch(setScramble(event.data.scramble));
  });

  store.dispatch(setScramble(generateScramble(getPuzzle(store.getState()))));

  return action => {
    const result = next(action);

    if (RESCRAMBLE_ON.includes(action.type)) {
      scrambleWorker.postMessage({
        puzzle: getPuzzle(store.getState())
      });
    }

    return result;
  }
}

export default scramble;
