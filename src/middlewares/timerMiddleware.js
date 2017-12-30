import shortid from 'shortid';

import { START_TIMER, STOP_TIMER } from '../constants/actionTypes';
import { TIMER_INTERVAL } from '../constants/app';
import { incrementTime, saveTime } from '../actions';

const timerMiddleware = store => next => {
  let timerInterval = null;

  const tick = () => store.dispatch(incrementTime(TIMER_INTERVAL));

  return action => {
    switch (action.type) {
      case START_TIMER:
        timerInterval = setInterval(tick, TIMER_INTERVAL);
        break;
      case STOP_TIMER: {
        const { timer, scramble } = store.getState();

        clearInterval(timerInterval);
        store.dispatch(saveTime(shortid.generate(), timer.time, new Date(), scramble))
        break;
      }
    }

    return next(action);
  }
}

export default timerMiddleware;
