import { map, withLatestFrom, mergeMap, filter } from "rxjs/operators";
import { from } from "rxjs";
import { getUserId, isLoggedIn } from "../selectors/authentication";
import * as timesRepository from "../repositories/times";
import { showNotification } from "../slices/notifications";
import { importTimes } from "../slices/times";

export const importTimesEpic = (action$, state$) =>
  action$.pipe(
    filter(importTimes.match),
    withLatestFrom(state$),
    mergeMap(([action, state]) =>
      from(
        isLoggedIn(state)
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
