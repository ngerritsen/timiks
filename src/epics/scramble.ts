import { ofType } from "redux-observable";
import { merge, timer, of } from "rxjs";
import { mergeMap, withLatestFrom, map, filter } from "rxjs/operators";

import * as actionTypes from "../constants/actionTypes";
import { generateScramble } from "../helpers/scramble";
import { getPuzzle } from "../selectors/settings";
import { changeSetting, loadSettings } from "../slices/settings";
import { refreshScramble, setScramble } from "../slices/scramble";

export const scrambleEpic = (action$, state$) =>
  merge(
    action$.pipe(
      ofType(
        String(loadSettings),
        String(refreshScramble),
        actionTypes.STOP_TIMER,
        actionTypes.SUBMIT_TIME_INPUT
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
