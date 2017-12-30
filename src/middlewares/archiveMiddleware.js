import shortid from 'shortid';

import * as timesRepository from '../repositories/timesRepository';
import { ARCHIVE, ARCHIVE_CURRENT_TIMES, REMOVE_ARCHIVE_ITEM } from '../constants/actionTypes';
import { archive } from '../actions';

const storageActions = [ARCHIVE, REMOVE_ARCHIVE_ITEM];

const archiveMiddleware = store => next => action => {
  if (action.type === ARCHIVE_CURRENT_TIMES) {
    const { times, settings } = store.getState();

    store.dispatch(archive(shortid.generate(), times.current, settings.puzzle));
  }

  const result = next(action);

  if (storageActions.includes(action.type)) {
    timesRepository.storeArchive(store.getState().archive.items);
  }

  return result;
};

export default archiveMiddleware;
