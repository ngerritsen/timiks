import shortid from 'shortid';

import { STOP_TIMER, START_TIMER, START_INSPECTION, FAIL_INSPECTION } from '../constants/actionTypes';
import { saveTime } from '../actions';

const timerMiddleware = store => next => action => {
  switch (action.type) {
    case START_INSPECTION:
    case START_TIMER: {
      return next({
        ...action,
        startTime: Date.now()
      });
    }
    case FAIL_INSPECTION: {
      const { scramble, settings } = store.getState();
      const now = new Date();
      store.dispatch(saveTime(shortid.generate(), 0, now, scramble, settings.puzzle, true));
      break;
    }
    case STOP_TIMER: {
      const { timer, scramble, settings } = store.getState();
      const now = new Date();
      const finalTime = now.getTime() - timer.startTime;

      store.dispatch(saveTime(shortid.generate(), finalTime, now, scramble, settings.puzzle));

      return next({ ...action, finalTime });
    }
  }

  return next(action);
}

export default timerMiddleware;
