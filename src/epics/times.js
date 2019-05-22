import { from } from 'rxjs';
import { ofType } from 'redux-observable';
import { withLatestFrom, filter, mergeMap, map, takeUntil, ignoreElements } from 'rxjs/operators';

import * as actionTypes from '../constants/actionTypes';
import * as actions from '../actions';
import * as timesRepository from '../repositories/times';
import { getUserId, isLoggedIn } from '../selectors/authentication';
import { getCurrentTimeIds, getUnstoredTimes } from '../selectors/times';
import { listenForChanges } from '../repositories/times';

export const saveTimeEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.SAVE_TIME),
    withLatestFrom(state$),
    filter(([, state]) => isLoggedIn(state)),
    mergeMap(([action, state]) => from(timesRepository.save(getUserId(state), action.time))),
    ignoreElements()
  );

export const storeTimesEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.LOGIN_SUCCEEDED),
    withLatestFrom(state$),
    filter(([, state]) => isLoggedIn(state)),
    mergeMap(([, state]) =>
      from(timesRepository.saveAll(getUserId(state), getUnstoredTimes(state)))
    ),
    ignoreElements()
  );

export const updateTimeEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.UPDATE_TIME),
    withLatestFrom(state$),
    filter(([, state]) => isLoggedIn(state)),
    mergeMap(([action, state]) =>
      from(timesRepository.update(getUserId(state), action.id, action.fields))
    ),
    ignoreElements()
  );

export const removeTimeEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.REMOVE_TIME),
    withLatestFrom(state$),
    filter(([, state]) => isLoggedIn(state)),
    mergeMap(([action, state]) => from(timesRepository.remove(getUserId(state), action.id))),
    ignoreElements()
  );

export const archiveTimesEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.ARCHIVE_TIMES),
    withLatestFrom(state$),
    filter(([, state]) => isLoggedIn(state)),
    mergeMap(([, state]) =>
      from(
        timesRepository.updateAll(getUserId(state), getCurrentTimeIds(state), {
          current: false
        })
      )
    ),
    ignoreElements()
  );

export const clearTimesEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.CLEAR_TIMES),
    withLatestFrom(state$),
    filter(([, state]) => isLoggedIn(state)),
    mergeMap(([, state]) =>
      from(timesRepository.removeAll(getUserId(state), getCurrentTimeIds(state)))
    ),
    ignoreElements()
  );

export const loadTimesEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.LOGIN_SUCCEEDED),
    withLatestFrom(state$),
    mergeMap(([, state]) =>
      listenForChanges(getUserId(state)).pipe(
        map(actions.loadTimes),
        takeUntil(action$.pipe(ofType(actionTypes.LOGOUT_SUCCEEDED)))
      )
    )
  );
