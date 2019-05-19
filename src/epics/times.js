import { from } from 'rxjs';
import { ofType } from 'redux-observable';
import { withLatestFrom, filter, concatMap, map, pairwise } from 'rxjs/operators';

import * as actionTypes from '../constants/actionTypes';
import * as actions from '../actions';
import * as timesRepository from '../repositories/times';
import { getUserId, isLoggedIn } from '../selectors/authentication';
import { getCurrentTimeIds, getTime, getUnstoredTimes } from '../selectors/times';

export const storeTimeEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.SAVE_TIME),
    withLatestFrom(state$),
    filter(([, state]) => isLoggedIn(state)),
    concatMap(([action, state]) =>
      from(timesRepository.save(getUserId(state), action.time)).pipe(
        map(() => actions.storedTime(action.time.id))
      )
    )
  );

export const storeTimesEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.LOGIN_SUCCEEDED),
    withLatestFrom(state$),
    filter(([, state]) => isLoggedIn(state)),
    concatMap(([, state]) => {
      const times = getUnstoredTimes(state);
      return from(timesRepository.saveAll(getUserId(state), times)).pipe(
        map(() => actions.storedTimes(times.map(time => time.id)))
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
        map(() => actions.storedTime(action.id))
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
        map(() => actions.removedTime(action.id))
      )
    )
  );

export const archiveTimesEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.ARCHIVE_TIMES),
    withLatestFrom(state$.pipe(pairwise())),
    filter(([, [, newState]]) => isLoggedIn(newState)),
    concatMap(([, [oldState, newState]]) => {
      const currentTimeIds = getCurrentTimeIds(oldState);
      return from(
        timesRepository.updateAll(getUserId(newState), currentTimeIds, { current: false })
      ).pipe(map(() => actions.archivedTimes(currentTimeIds)));
    })
  );

export const clearTimesEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.CLEAR_TIMES),
    withLatestFrom(state$.pipe(pairwise())),
    filter(([, [, newState]]) => isLoggedIn(newState)),
    concatMap(([, [oldState, newState]]) => {
      const currentTimeIds = getCurrentTimeIds(oldState);
      return from(timesRepository.removeAll(getUserId(newState), currentTimeIds)).pipe(
        map(() => actions.clearedTimes(currentTimeIds))
      );
    })
  );

export const loadTimesEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.LOGIN_SUCCEEDED),
    withLatestFrom(state$),
    concatMap(([, state]) =>
      from(timesRepository.getAll(getUserId(state))).pipe(map(actions.loadTimes))
    )
  );
