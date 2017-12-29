import shortid from 'shortid';

import * as timesRepository from '../repositories/timesRepository';
import { ARCHIVE_CURRENT_TIMES } from '../constants/actionTypes';
import { archive } from '../actions';

const archiveMiddleware = store => next => action => {
  if (action.type === ARCHIVE_CURRENT_TIMES) {
    const { times, settings } = store.getState();

    store.dispatch(archive(shortid.generate(), times.current, settings.puzzle));

    timesRepository.storeArchive(store.getState().archive.items);
  }

  return next(action);
};

export default archiveMiddleware;
