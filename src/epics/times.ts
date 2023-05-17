import { from, merge } from "rxjs";
import {
  withLatestFrom,
  filter,
  mergeMap,
  switchMap,
  map,
  takeUntil,
  ignoreElements,
} from "rxjs/operators";

import * as timesRepository from "../repositories/times";
import { getUserId, getIsLoggedIn } from "../selectors/auth";
import {
  getCurrentTimeIds,
  getUnstoredTimes,
  getRequiredTimes,
} from "../selectors/times";
import { listenForChanges } from "../repositories/times";
import {
  archiveTimes,
  clearTimes,
  loadTimes,
  removeTime,
  requireTimes,
  saveTime,
  updateTime,
} from "../slices/times";
import { TimiksEpic } from "../types";
import { loginSucceeded, logoutSucceeded } from "../slices/auth";

export const saveTimeEpic: TimiksEpic = (action$, state$) =>
  action$.pipe(
    filter(saveTime.match),
    withLatestFrom(state$),
    filter(([, state]) => getIsLoggedIn(state)),
    mergeMap(([action, state]) =>
      from(timesRepository.save(getUserId(state), action.payload))
    ),
    ignoreElements()
  );

export const storeTimesEpic: TimiksEpic = (action$, state$) =>
  action$.pipe(
    filter(loginSucceeded.match),
    withLatestFrom(state$),
    filter(([, state]) => getIsLoggedIn(state)),
    mergeMap(([, state]) =>
      from(timesRepository.saveAll(getUserId(state), getUnstoredTimes(state)))
    ),
    ignoreElements()
  );

export const updateTimeEpic: TimiksEpic = (action$, state$) =>
  action$.pipe(
    filter(updateTime.match),
    withLatestFrom(state$),
    filter(([, state]) => getIsLoggedIn(state)),
    mergeMap(([action]) =>
      from(timesRepository.update(action.payload.id, action.payload.fields))
    ),
    ignoreElements()
  );

export const removeTimeEpic: TimiksEpic = (action$, state$) =>
  action$.pipe(
    filter(removeTime.match),
    withLatestFrom(state$),
    filter(([, state]) => getIsLoggedIn(state)),
    mergeMap(([action]) => from(timesRepository.remove(action.payload))),
    ignoreElements()
  );

export const archiveTimesEpic: TimiksEpic = (action$, state$) =>
  action$.pipe(
    filter(archiveTimes.match),
    withLatestFrom(state$),
    filter(([, state]) => getIsLoggedIn(state)),
    mergeMap(([, state]) =>
      from(
        timesRepository.updateAll(getCurrentTimeIds(state), {
          current: false,
        })
      )
    ),
    ignoreElements()
  );

export const clearTimesEpic: TimiksEpic = (action$, state$) =>
  action$.pipe(
    filter(clearTimes.match),
    withLatestFrom(state$),
    filter(([, state]) => getIsLoggedIn(state)),
    mergeMap(([, state]) =>
      from(timesRepository.removeAll(getCurrentTimeIds(state)))
    ),
    ignoreElements()
  );

export const loadTimesEpic: TimiksEpic = (action$, state$) =>
  merge(
    action$.pipe(filter(loginSucceeded.match)),
    action$.pipe(filter(requireTimes.match)).pipe(
      withLatestFrom(state$),
      filter(([, state]) => getIsLoggedIn(state))
    )
  ).pipe(
    withLatestFrom(state$),
    switchMap(([, state]) => {
      const { current, puzzle, days } = getRequiredTimes(state);

      return listenForChanges(getUserId(state), current, puzzle, days).pipe(
        map((times) => loadTimes({ times, current, puzzle })),
        takeUntil(action$.pipe(filter(logoutSucceeded.match)))
      );
    })
  );
