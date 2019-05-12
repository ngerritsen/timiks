import NoSleep from 'nosleep.js/dist/NoSleep.js';

import * as actionTypes from '../constants/actionTypes';
import { isStopped } from '../selectors/timer';

const noSleepInstance = new NoSleep();

const noSleep = store => next => action => {
  switch (action.type) {
    case actionTypes.PREPARE_ACTIVATION:
    case actionTypes.SKIP_PREPARATION_STAGE:
      noSleepInstance.enable();
      break;
    case actionTypes.STOP_TIMER:
      noSleepInstance.disable();
      break;
    case actionTypes.RESET_ACTIVATION: {
      if (isStopped(store.getState())) {
        noSleepInstance.disable();
      }

      break;
    }
    default:
      break;
  }

  return next(action);
};

export default noSleep;
