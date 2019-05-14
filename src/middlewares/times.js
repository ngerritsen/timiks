import * as actionTypes from '../constants/actionTypes';
import { loadTimes } from '../actions';
import * as timesRepository from '../repositories/timesRepository';
import { getArchivedTimes, getCurrentTimes } from '../selectors/times';

const storeActions = [
  actionTypes.SAVE_TIME,
  actionTypes.REMOVE_TIME,
  actionTypes.CLEAR_TIMES,
  actionTypes.UPDATE_TIME,
  actionTypes.ARCHIVE_TIMES,
  actionTypes.REMOVE_ARCHIVED_TIME
];

const times = store => next => {
  const current = timesRepository.getCurrent();
  const archived = timesRepository.getArchived();

  store.dispatch(loadTimes(current, archived));

  return action => {
    const result = next(action);

    if (storeActions.includes(action.type)) {
      window.setTimeout(() => {
        timesRepository.storeCurrent(getCurrentTimes(store.getState()));
        timesRepository.storeArchived(getArchivedTimes(store.getState()));
      });
    }

    return result;
  };
};

export default times;
