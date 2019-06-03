import { ofType } from 'redux-observable';
import { merge, timer, of } from 'rxjs';
import { mergeMap, withLatestFrom, map } from 'rxjs/operators';

import * as actionTypes from '../constants/actionTypes';
import { setScramble } from '../actions';
import { generateScramble } from '../helpers/scramble';
import { getPuzzle } from '../selectors/settings';

export const scrambleEpic = (action$, state$) =>
  merge(
    action$.pipe(
      ofType(
        actionTypes.LOAD_SETTINGS,
        actionTypes.STOP_TIMER,
        actionTypes.CHANGE_PUZZLE,
        actionTypes.REFRESH_SCRAMBLE,
        actionTypes.SUBMIT_TIME_INPUT
      ),
      withLatestFrom(state$),
      mergeMap(([action, state]) =>
        action.type === actionTypes.LOAD_SETTINGS
          ? of(setScramble(generateScramble(getPuzzle(state)), getPuzzle(state)))
          : timer(1).pipe(
              map(() => setScramble(generateScramble(getPuzzle(state)), getPuzzle(state)))
            )
      )
    )
  );
