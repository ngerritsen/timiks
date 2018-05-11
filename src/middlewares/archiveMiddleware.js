import shortid from 'shortid';

import * as timesRepository from '../repositories/timesRepository';
import * as actionTypes from '../constants/actionTypes';
import { archive, loadArchive } from '../actions';

const storageActions = [
  actionTypes.ARCHIVE,
  actionTypes.REMOVE_ARCHIVE_ITEM,
  actionTypes.IMPORT_ARCHIVE
];

const archiveMiddleware = store => next => {
  const archiveItems = timesRepository.getArchive();

  store.dispatch(loadArchive(archiveItems));

  return action => {
    if (action.type === actionTypes.ARCHIVE_CURRENT_TIMES) {
      const { times, settings } = store.getState();

      store.dispatch(archive(shortid.generate(), times.current, settings.puzzle));
    }

    const result = next(action);

    if (storageActions.includes(action.type)) {
      timesRepository.storeArchive(store.getState().archive.items);
    }

    return result;
  }
};

export default archiveMiddleware;
