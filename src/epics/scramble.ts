import { ofType } from "redux-observable";
import { merge, timer, of } from "rxjs";
import { mergeMap, withLatestFrom, map, filter } from "rxjs/operators";

import { generateScramble } from "../helpers/scramble";
import { getPuzzle } from "../selectors/settings";
import { changeSetting, loadSettings } from "../slices/settings";
import { refreshScramble, setScramble } from "../slices/scramble";
import { stopTimer, submitTimeInput } from "../slices/timer";
import { TimiksEpic } from "../types";

export const scrambleEpic: TimiksEpic = (action$, state$) =>
  merge(
    action$.pipe(
      ofType(
        loadSettings.toString(),
        refreshScramble.toString(),
        stopTimer.toString(),
        submitTimeInput.toString()
      )
    ),
    action$.pipe(
      filter(
        (action) =>
          changeSetting.match(action) && action.payload.setting === "puzzle"
      )
    )
  ).pipe(
    withLatestFrom(state$),
    mergeMap(([action, state]) =>
      loadSettings.match(action)
        ? of(
            setScramble({
              scramble: generateScramble(getPuzzle(state)),
              puzzle: getPuzzle(state),
            })
          )
        : timer(1).pipe(
            map(() =>
              setScramble({
                scramble: generateScramble(getPuzzle(state)),
                puzzle: getPuzzle(state),
              })
            )
          )
    )
  );
