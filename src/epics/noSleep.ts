import { ofType } from "redux-observable";
import { tap, map, withLatestFrom, filter } from "rxjs/operators";

import * as noSleepService from "../services/noSleep";
import * as actionTypes from "../constants/actionTypes";
import { noSleepDisabled, noSleepEnabled } from "../slices/noSleep";
import { isStopped } from "../selectors/timer";
import { TimiksEpic } from "../types";

export const enableNoSleepEpic: TimiksEpic = (action$) =>
  action$.pipe(
    ofType(actionTypes.START_TIMER),
    tap(noSleepService.enable),
    map(() => noSleepEnabled())
  );

export const disableNoSleepEpic: TimiksEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.STOP_TIMER),
    withLatestFrom(state$),
    filter(([, state]) => isStopped(state)),
    tap(noSleepService.disable),
    map(() => noSleepDisabled())
  );
