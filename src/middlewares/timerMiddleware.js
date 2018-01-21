import shortid from 'shortid';

import { STOP_TIMER, START_TIMER } from '../constants/actionTypes';
import { saveTime } from '../actions';

const timerMiddleware = store => next => action => {
  switch (action.type) {
    case START_TIMER: {
      return next({
        ...action,
        startTime: Date.now()
      });
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
