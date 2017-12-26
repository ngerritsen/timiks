import NoSleep from 'nosleep.js/dist/NoSleep';
import { START_TIMER, STOP_TIMER } from '../constants';

const noSleep = new NoSleep();

const noSleepMiddleware = () => next => action => {
  switch (action.type) {
    case START_TIMER:
      noSleep.enable();
      break;
    case STOP_TIMER:
      noSleep.disable();
      break;
    default:
      break;
  }

  return next(action);

};

export default noSleepMiddleware;
