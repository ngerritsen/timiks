import { of } from 'rxjs';
import { ofType } from 'redux-observable';
import { map, delay, tap, withLatestFrom } from 'rxjs/operators';

import * as actionTypes from '../constants/actionTypes';
import { loadTimes, timesStored } from '../actions';
import * as timesRepository from '../repositories/localTimes';
import { getArchivedTimes, getCurrentTimes } from '../selectors/times';

export const loadTimesEpic = () =>
  of(loadTimes(timesRepository.getCurrent(), timesRepository.getArchived()));

export const storeTimesEpic = (action$, state$) =>
  action$.pipe(
    ofType(
      actionTypes.SAVE_TIME,
      actionTypes.REMOVE_TIME,
      actionTypes.CLEAR_TIMES,
      actionTypes.UPDATE_TIME,
      actionTypes.ARCHIVE_TIMES,
      actionTypes.REMOVE_ARCHIVED_TIME
    ),
    delay(0),
    withLatestFrom(state$),
    tap(([, state]) => {
      timesRepository.storeCurrent(getCurrentTimes(state));
      timesRepository.storeArchived(getArchivedTimes(state));
    }),
    map(timesStored)
  );
