import { SAVE_TIME, REMOVE_TIME, CLEAR_TIMES, SAVE_TIMES } from '../constants';
import { loadTimes } from '../actions';
import * as timesRepository from '../repositories/timesRepository';

const storeActions = [SAVE_TIME, REMOVE_TIME, CLEAR_TIMES, SAVE_TIMES];

const timesMiddleware = store => next => {
  const times = timesRepository.getAll();

  if (times) {
    store.dispatch(loadTimes(times));
  }

  return action => {
    const result = next(action);

    if (storeActions.includes(action.type)) {
      timesRepository.store(store.getState().times.times);
    }

    return result;
  }
};

export default timesMiddleware;
