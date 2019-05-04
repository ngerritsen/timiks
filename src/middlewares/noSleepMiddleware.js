import NoSleep from 'nosleep.js/dist/NoSleep.js';

import * as actionTypes from '../constants/actionTypes';

const noSleep = new NoSleep();

const noSleepMiddleware = store => next => action => {
  switch (action.type) {
    case actionTypes.PREPARE_ACTIVATION:
    case actionTypes.SKIP_PREPARATION_STAGE:
      noSleep.enable();
      break;
    case actionTypes.STOP_TIMER:
      noSleep.disable();
      break;
    case actionTypes.RESET_ACTIVATION: {
      const { stopped } = store.getState().timer;

      if (stopped) {
        window.requestAnimationFrame(() => {
          noSleep.disable();
        });
      }

      break;
    }
    default:
      break;
  }

  return next(action);
};

export default noSleepMiddleware;
