import shortid from 'shortid';

import { STOP_TIMER, START_TIMER } from '../constants/actionTypes';
import { saveTime } from '../actions';

const timerMiddleware = store => next => action => {
  switch (action.type) {
    case START_TIMER: {
      return next({
        ...action,
        startTime: new Date().getTime()
      });
    }
    case STOP_TIMER: {
      const { timer, scramble } = store.getState();
      const ms = new Date().getTime() - timer.startTime;

      store.dispatch(saveTime(shortid.generate(), ms, new Date(), scramble));
      break;
    }
  }

  return next(action);
}

export default timerMiddleware;
