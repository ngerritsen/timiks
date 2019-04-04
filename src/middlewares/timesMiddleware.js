import { SAVE_TIME, REMOVE_TIME, CLEAR_TIMES, ARCHIVE_TIMES } from '../constants/actionTypes';
import { loadTimes } from '../actions';
import * as timesRepository from '../repositories/timesRepository';

const storeActions = [SAVE_TIME, REMOVE_TIME, CLEAR_TIMES, ARCHIVE_TIMES];

const timesMiddleware = store => next => {
  const current = timesRepository.getCurrent();
  const archived = timesRepository.getArchived();

  store.dispatch(loadTimes(current, archived));

  return action => {
    const result = next(action);

    if (storeActions.includes(action.type)) {
      const { times } = store.getState();

      timesRepository.storeCurrent(times.current);
      timesRepository.storeArchived(times.archived);
    }

    return result;
  }
};

export default timesMiddleware;
