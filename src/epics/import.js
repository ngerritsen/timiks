import { map, withLatestFrom, mergeMap } from "rxjs/operators";
import { from } from "rxjs";
import { ofType } from "redux-observable";
import { IMPORT_TIMES } from "../constants/actionTypes";
import { getUserId, isLoggedIn } from "../selectors/authentication";
import * as timesRepository from "../repositories/times";
import { showNotification } from "../slices/notifications";

export const importTimesEpic = (action$, state$) =>
  action$.pipe(
    ofType(IMPORT_TIMES),
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
