import shortid from 'shortid';
import { withLatestFrom, map } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { FAIL_INSPECTION, SUBMIT_TIME_INPUT, STOP_TIMER } from '../constants/actionTypes';
import { saveTime } from '../actions';
import { getPuzzle } from '../selectors/settings';
import { getStartTime } from '../selectors/timer';
import { getScramble } from '../selectors/scramble';

export const failInspectionEpic = (action$, state$) =>
  action$.pipe(
    ofType(FAIL_INSPECTION),
    withLatestFrom(state$),
    map(([, state]) => createSaveTime(0, state, true))
  );

export const submitTimeEpic = (action$, state$) =>
  action$.pipe(
    ofType(SUBMIT_TIME_INPUT),
    withLatestFrom(state$),
    map(([action, state]) => createSaveTime(action.ms, state, action.dnf, action.plus2))
  );

export const stopTimerEpic = (action$, state$) =>
  action$.pipe(
    ofType(STOP_TIMER),
    withLatestFrom(state$),
    map(([action, state]) => createSaveTime(action.stopTime - getStartTime(state), state))
  );

const createSaveTime = (ms, state, dnf, plus2) =>
  saveTime(shortid.generate(), ms, new Date(), getScramble(state), getPuzzle(state), dnf, plus2);
