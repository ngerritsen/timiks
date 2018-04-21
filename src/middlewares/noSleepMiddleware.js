import NoSleep from 'nosleep.js/dist/NoSleep.js';

import { PREPARE_ACTIVATION, RESET_ACTIVATION, STOP_TIMER } from '../constants/actionTypes';

const noSleep = new NoSleep();

const noSleepMiddleware = store => next => action => {
  switch (action.type) {
    case PREPARE_ACTIVATION:
      noSleep.enable();
      break;
    case STOP_TIMER:
      noSleep.disable();
      break;
    case RESET_ACTIVATION: {
      const { stopped } = store.getState().timer;

      if (stopped) {
        noSleep.disable();
      }

      break;
    }
    default:
      break;
  }

  return next(action);
};

export default noSleepMiddleware;
