import { from, merge } from "rxjs";
import { ofType } from "redux-observable";
import {
  withLatestFrom,
  filter,
  mergeMap,
  switchMap,
  map,
  takeUntil,
  ignoreElements,
} from "rxjs/operators";

import * as actionTypes from "../constants/actionTypes";
import * as actions from "../actions";
import * as timesRepository from "../repositories/times";
import { getUserId, isLoggedIn } from "../selectors/authentication";
import {
  getCurrentTimeIds,
  getUnstoredTimes,
  getRequiredTimes,
} from "../selectors/times";
import { listenForChanges } from "../repositories/times";

export const saveTimeEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.SAVE_TIME),
    withLatestFrom(state$),
    filter(([, state]) => isLoggedIn(state)),
    mergeMap(([action, state]) =>
      from(timesRepository.save(getUserId(state), action.payload))
    ),
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
    mergeMap(([action]) =>
      from(timesRepository.update(action.payload.id, action.payload.fields))
    ),
    ignoreElements()
  );

export const removeTimeEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.REMOVE_TIME),
    withLatestFrom(state$),
    filter(([, state]) => isLoggedIn(state)),
    mergeMap(([action]) => from(timesRepository.remove(action.payload))),
    ignoreElements()
  );

export const archiveTimesEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.ARCHIVE_TIMES),
    withLatestFrom(state$),
    filter(([, state]) => isLoggedIn(state)),
    mergeMap(([, state]) =>
      from(
        timesRepository.updateAll(getCurrentTimeIds(state), {
          current: false,
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
      from(timesRepository.removeAll(getCurrentTimeIds(state)))
    ),
    ignoreElements()
  );

export const loadTimesEpic = (action$, state$) =>
  merge(
    action$.pipe(ofType(actionTypes.LOGIN_SUCCEEDED)),
    action$.pipe(ofType(actionTypes.REQUIRE_TIMES)).pipe(
      withLatestFrom(state$),
      filter(([, state]) => isLoggedIn(state))
    )
  ).pipe(
    withLatestFrom(state$),
    switchMap(([, state]) => {
      const { current, puzzle, days } = getRequiredTimes(state);

      return listenForChanges(getUserId(state), current, puzzle, days).pipe(
        map((times) => actions.loadTimes(times, current, puzzle)),
        takeUntil(action$.pipe(ofType(actionTypes.LOGOUT_SUCCEEDED)))
      );
    })
  );
