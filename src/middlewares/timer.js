import shortid from 'shortid';

import * as actionTypes from '../constants/actionTypes';
import { saveTime } from '../actions';
import { parseTimeInput } from '../helpers/time';

const timer = store => next => action => {
  switch (action.type) {
    case actionTypes.FAIL_INSPECTION: {
      const { scramble, settings } = store.getState();
      const now = new Date();
      store.dispatch(saveTime(shortid.generate(), 0, now, scramble, settings.puzzle, true));
      break;
    }
    case actionTypes.SUBMIT_TIME_INPUT: {
      const { timer, scramble, settings } = store.getState();
      const { ms, dnf, plus2 } = parseTimeInput(timer.timeInput);
      const id = shortid.generate();
      const now = new Date();

      store.dispatch(saveTime(id, ms, now, scramble, settings.puzzle, dnf, plus2));

      return next({ ...action, lastTimeId: id });
    }
    case actionTypes.STOP_TIMER: {
      const { timer, scramble, settings } = store.getState();
      const id = shortid.generate();

      const result = next({ ...action, lastTimeId: id });

      window.setTimeout(() => {
        const now = new Date();
        const finalTime = action.stopTime - timer.startTime;

        store.dispatch(saveTime(id, finalTime, now, scramble, settings.puzzle));
      });

      return result;
    }
  }

  return next(action);
}

export default timer;