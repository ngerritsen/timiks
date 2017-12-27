import { SAVE_TIME, REMOVE_TIME, CLEAR_TIMES, SAVE_TIMES } from '../constants/actionTypes';
import { loadTimes } from '../actions';
import * as timesRepository from '../repositories/timesRepository';

const storeActions = [SAVE_TIME, REMOVE_TIME, CLEAR_TIMES, SAVE_TIMES];

const timesMiddleware = store => next => {
  const current = timesRepository.getCurrent();
  const archive = timesRepository.getArchive();

  store.dispatch(loadTimes(current, archive));

  return action => {
    const result = next(action);

    if (storeActions.includes(action.type)) {
      const { current, archive } = store.getState().times;

      timesRepository.storeCurrent(current);

      if (action.type === SAVE_TIMES) {
        timesRepository.storeArchive(archive);
      }
    }

    return result;
  }
};

export default timesMiddleware;
