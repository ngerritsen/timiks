import { map, withLatestFrom, mergeMap, filter } from "rxjs/operators";
import { from } from "rxjs";
import { getUserId, getIsLoggedIn } from "../selectors/auth";
import * as timesRepository from "../repositories/times";
import { showNotification } from "../slices/notifications";
import { importTimes } from "../slices/times";
import { TimiksEpic } from "../types";

export const importTimesEpic: TimiksEpic = (action$, state$) =>
  action$.pipe(
    filter(importTimes.match),
    withLatestFrom(state$),
    mergeMap(([action, state]) =>
      from(
        getIsLoggedIn(state)
          ? timesRepository.saveAll(getUserId(state), action.payload.times)
          : Promise.resolve()
      ).pipe(
        map(() =>
          showNotification({
            message: `Imported ${action.payload.times.length} times.`,
          })
        )
      )
    )
  );
