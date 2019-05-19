import { from } from 'rxjs';
import { ofType } from 'redux-observable';
import { withLatestFrom, filter, concatMap, map, pairwise } from 'rxjs/operators';

import * as actionTypes from '../constants/actionTypes';
import { archivedTimes, clearedTimes, loadTimes, removedTime, storedTime, storedTimes } from '../actions';
import * as timesRepository from '../repositories/times';
import { getUserId, isLoggedIn } from '../selectors/authentication';
import { getCurrentTimeIds, getTime, getUnstoredTimeIds, getUnstoredTimes } from '../selectors/times';

export const storeTimeEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.SAVE_TIME),
    withLatestFrom(state$),
    filter(([, state]) => isLoggedIn(state)),
    concatMap(([action, state]) =>
      from(timesRepository.save(getUserId(state), action.time)).pipe(
        map(() => storedTime(action.time.id))
      )
    )
  );

export const storeTimesEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.LOGIN_SUCCEEDED),
    withLatestFrom(state$),
    filter(([, state]) => isLoggedIn(state)),
    concatMap(([_, state]) => {
      const times = getUnstoredTimes(state);
      return from(timesRepository.saveAll(getUserId(state), times)).pipe(
        map(() => storedTimes(times.map(time => time.id)))
      );
    })
  );

export const updateTimeEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.UPDATE_TIME),
    withLatestFrom(state$),
    filter(([, state]) => isLoggedIn(state)),
    concatMap(([action, state]) =>
      from(timesRepository.save(getUserId(state), getTime(state, action.id))).pipe(
        map(() => storedTime(action.id))
      )
    )
  );

export const removeTimeEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.REMOVE_TIME),
    withLatestFrom(state$),
    filter(([, state]) => isLoggedIn(state)),
    concatMap(([action, state]) =>
      from(timesRepository.remove(getUserId(state), action.id)).pipe(
        map(() => removedTime(action.id))
      )
    )
  );

export const archiveTimesEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.ARCHIVE_TIMES),
    withLatestFrom(state$.pipe(pairwise())),
    filter(([, [, newState]]) => isLoggedIn(newState)),
    concatMap(([_, [oldState, newState]]) => {
      const currentTimeIds = getCurrentTimeIds(oldState);
      return from(
        timesRepository.updateAll(getUserId(newState), currentTimeIds, { current: false })
      ).pipe(map(() => archivedTimes(currentTimeIds)));
    })
  );

export const clearTimesEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.CLEAR_TIMES),
    withLatestFrom(state$.pipe(pairwise())),
    filter(([, [, newState]]) => isLoggedIn(newState)),
    concatMap(([_, [oldState, newState]]) => {
      const currentTimeIds = getCurrentTimeIds(oldState);
      return from(timesRepository.removeAll(getUserId(newState), currentTimeIds)).pipe(
        map(() => clearedTimes(currentTimeIds))
      );
    })
  );

export const loadTimesEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.LOGIN_SUCCEEDED),
    withLatestFrom(state$),
    concatMap(([, state]) => from(timesRepository.getAll(getUserId(state))).pipe(map(loadTimes)))
  );
