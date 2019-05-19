import { of } from 'rxjs';
import { ofType } from 'redux-observable';
import { map, delay, tap, withLatestFrom } from 'rxjs/operators';

import * as actionTypes from '../constants/actionTypes';
import { loadLocalTimes, storedLocalTimes } from '../actions';
import * as timesRepository from '../repositories/localTimes';
import { getTimes } from '../selectors/times';

export const loadLocalTimesEpic = () => of(loadLocalTimes(timesRepository.getAll()));

export const storeLocalTimesEpic = (action$, state$) =>
  action$.pipe(
    ofType(
      actionTypes.SAVE_TIME,
      actionTypes.REMOVE_TIME,
      actionTypes.CLEAR_TIMES,
      actionTypes.UPDATE_TIME,
      actionTypes.ARCHIVE_TIMES
    ),
    delay(0),
    withLatestFrom(state$),
    tap(([, state]) => timesRepository.store(getTimes(state))),
    map(storedLocalTimes)
  );
