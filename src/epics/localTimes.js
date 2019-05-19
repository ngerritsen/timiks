import { of } from 'rxjs';
import { ofType } from 'redux-observable';
import { map, delay, tap, withLatestFrom } from 'rxjs/operators';

import * as actionTypes from '../constants/actionTypes';
import { loadLocalTimes, storedLocalTimes } from '../actions';
import * as timesRepository from '../repositories/localTimes';
import { getTimesForLocalStorage } from '../selectors/times';
import { isLoggedIn } from '../selectors/authentication';

export const loadLocalTimesEpic = () => of(loadLocalTimes(timesRepository.getAll()));

export const storeLocalTimesEpic = (action$, state$) =>
  action$.pipe(
    ofType(
      actionTypes.SAVE_TIME,
      actionTypes.SAVE_TIME_SUCCEEDED,
      actionTypes.REMOVE_TIME,
      actionTypes.REMOVE_TIME_SUCCEEDED,
      actionTypes.CLEAR_TIMES,
      actionTypes.CLEAR_TIMES_SUCCEEDED,
      actionTypes.UPDATE_TIME,
      actionTypes.UPDATE_TIME_SUCCEEDED,
      actionTypes.ARCHIVE_TIMES,
      actionTypes.ARCHIVE_TIMES_SUCCEEDED,
      actionTypes.SAVE_TIMES_SUCCEEDED
    ),
    delay(0),
    withLatestFrom(state$),
    tap(([, state]) => timesRepository.store(getTimesForLocalStorage(state, isLoggedIn(state)))),
    map(storedLocalTimes)
  );
