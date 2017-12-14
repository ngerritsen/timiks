import { START_TIMER, TIMER_INTERVAL, STOP_TIMER } from '../constants';
import { incrementTime } from '../actions';

const timerMiddleware = store => next => {
  let timer = null;

  const tick = () => store.dispatch(incrementTime(TIMER_INTERVAL));

  return action => {
    switch (action.type) {
      case START_TIMER:
        timer = setInterval(tick, TIMER_INTERVAL);
        break;
      case STOP_TIMER:
        clearInterval(timer);
        break;
    }

    return next(action);
  }
}

export default timerMiddleware;
