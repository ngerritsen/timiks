import { ofType } from 'redux-observable';
import { fromEvent, merge } from 'rxjs';
import { tap, withLatestFrom, map } from 'rxjs/operators';

import * as actionTypes from '../constants/actionTypes';
import { scrambleRequested, setScramble } from '../actions';
import { generateScramble } from '../helpers/scramble';
import { getPuzzle } from '../selectors/settings';
import { LOAD_SETTINGS } from '../constants/actionTypes';

const workerPathEl = document.querySelector('[data-scramble-worker-path]');
const workerPath = workerPathEl.getAttribute('data-scramble-worker-path');
const scrambleWorker = new Worker(workerPath);

export const scrambleEpic = (action$, state$) =>
  merge(
    fromEvent(scrambleWorker, 'message').pipe(map(event => event.data.scramble)),
    action$.pipe(
      ofType(LOAD_SETTINGS),
      withLatestFrom(state$),
      map(([, state]) => generateScramble(getPuzzle(state)))
    )
  ).pipe(map(setScramble));

export const rescrambleEpic = (action$, state$) =>
  action$.pipe(
    ofType(
      actionTypes.STOP_TIMER,
      actionTypes.CHANGE_PUZZLE,
      actionTypes.REFRESH_SCRAMBLE,
      actionTypes.SUBMIT_TIME_INPUT
    ),
    withLatestFrom(state$),
    tap(([, state]) =>
      scrambleWorker.postMessage({
        puzzle: getPuzzle(state)
      })
    ),
    map(scrambleRequested)
  );
