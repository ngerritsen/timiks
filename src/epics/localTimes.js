import { ofType } from "redux-observable";
import { map, delay, tap, withLatestFrom } from "rxjs/operators";
import { merge, of } from "rxjs";

import * as actionTypes from "../constants/actionTypes";
import { loadLocalTimes, storedLocalTimes } from "../actions";
import * as timesRepository from "../repositories/localTimes";
import { getTimesForLocalStorage } from "../selectors/times";
import { isLoggedIn } from "../selectors/authentication";
import { LOGOUT_SUCCEEDED } from "../constants/actionTypes";

export const loadLocalTimesEpic = (action$) =>
  merge(of(0), action$.pipe(ofType(LOGOUT_SUCCEEDED))).pipe(
    map(() => loadLocalTimes(timesRepository.getAll()))
  );

export const storeLocalTimesEpic = (action$, state$) =>
  action$.pipe(
    ofType(
      actionTypes.SAVE_TIME,
      actionTypes.REMOVE_TIME,
      actionTypes.CLEAR_TIMES,
      actionTypes.UPDATE_TIME,
      actionTypes.ARCHIVE_TIMES,
      actionTypes.IMPORT_TIMES
    ),
    delay(0),
    withLatestFrom(state$),
    tap(([, state]) =>
      timesRepository.store(getTimesForLocalStorage(state, isLoggedIn(state)))
    ),
    map(storedLocalTimes)
  );
