import shortid from 'shortid';
import { withLatestFrom, map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { LOCATION_CHANGE } from 'connected-react-router';

import { FAIL_INSPECTION, SUBMIT_TIME_INPUT, STOP_TIMER } from '../constants/actionTypes';
import { saveTime, resetTime, saveTrainerTime } from '../actions';
import { getPuzzle } from '../selectors/settings';
import { getStartTime, hasInspectionPenalty } from '../selectors/timer';
import { getScramble } from '../selectors/scramble';
import { isInTrainer } from '../selectors/router';
import { getTrainingType, getCurrentCaseId, getCurrentScramble } from '../selectors/trainer';

export const resetOnRouteEpic = action$ =>
  action$.pipe(
    ofType(LOCATION_CHANGE),
    map(resetTime)
  );

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
    map(([action, state]) =>
      createSaveTime(action.payload.ms, state, action.payload.dnf, action.payload.plus2)
    )
  );

export const stopTimerEpic = (action$, state$) =>
  action$.pipe(
    ofType(STOP_TIMER),
    withLatestFrom(state$),
    map(([action, state]) =>
      isInTrainer(state)
        ? saveTrainerTime({
            id: shortid.generate(),
            trainingType: getTrainingType(state),
            caseId: getCurrentCaseId(state),
            ms: action.payload - getStartTime(state),
            timestamp: new Date(),
            scramble: getCurrentScramble(state)
          })
        : createSaveTime(
            action.payload - getStartTime(state),
            state,
            false,
            hasInspectionPenalty(state)
          )
    )
  );

const createSaveTime = (ms, state, dnf, plus2) =>
  saveTime({
    id: shortid.generate(),
    ms,
    date: new Date(),
    scramble: getScramble(state),
    puzzle: getPuzzle(state),
    dnf,
    plus2,
    current: true
  });
