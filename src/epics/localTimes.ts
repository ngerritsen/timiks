import { ofType } from "redux-observable";
import {
  map,
  delay,
  tap,
  withLatestFrom,
  ignoreElements,
  filter,
} from "rxjs/operators";
import { merge, of } from "rxjs";

import * as timesRepository from "../repositories/localTimes";
import { getTimesForLocalStorage } from "../selectors/times";
import { getIsLoggedIn } from "../selectors/auth";
import {
  archiveTimes,
  clearTimes,
  importTimes,
  loadLocalTimes,
  removeTime,
  saveTime,
  updateTime,
} from "../slices/times";
import { TimiksEpic } from "../types";
import { logoutSucceeded } from "../slices/auth";

export const loadLocalTimesEpic: TimiksEpic = (action$) =>
  merge(of(0), action$.pipe(filter(logoutSucceeded.match))).pipe(
    map(() => loadLocalTimes(timesRepository.getAll()))
  );

export const storeLocalTimesEpic: TimiksEpic = (action$, state$) =>
  action$.pipe(
    ofType(
      saveTime.toString(),
      removeTime.toString(),
      clearTimes.toString(),
      updateTime.toString(),
      archiveTimes.toString(),
      importTimes.toString()
    ),
    delay(0),
    withLatestFrom(state$),
    tap(([, state]) =>
      timesRepository.store(
        getTimesForLocalStorage(state, getIsLoggedIn(state))
      )
    ),
    ignoreElements()
  );
