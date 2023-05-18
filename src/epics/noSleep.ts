import { tap, map, withLatestFrom, filter } from "rxjs/operators";

import * as noSleepService from "../services/noSleep";
import { noSleepDisabled, noSleepEnabled } from "../slices/noSleep";
import { isStopped } from "../selectors/timer";
import { TimiksEpic } from "../types";
import { startTimer, stopTimer } from "../slices/timer";

export const enableNoSleepEpic: TimiksEpic = (action$) =>
  action$.pipe(
    filter(startTimer.match),
    tap(noSleepService.enable),
    map(() => noSleepEnabled())
  );

export const disableNoSleepEpic: TimiksEpic = (action$, state$) =>
  action$.pipe(
    filter(stopTimer.match),
    withLatestFrom(state$),
    filter(([, state]) => isStopped(state)),
    tap(noSleepService.disable),
    map(() => noSleepDisabled())
  );
