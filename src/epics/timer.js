import { withLatestFrom, map } from "rxjs/operators";
import { ofType } from "redux-observable";

import { saveTime, resetTime } from "../actions";
import {
  changeTrainingType,
  clearTrainerTimes,
  removeTrainerTime,
  saveTrainerTime,
} from "../slices/trainer";
import { getPuzzle } from "../selectors/settings";
import {
  getStartTime,
  hasInspectionPenalty,
  isTraining,
} from "../selectors/timer";
import { getScramble } from "../selectors/scramble";
import {
  getTrainingType,
  getCurrentCaseId,
  getCurrentScramble,
} from "../selectors/trainer";
import {
  FAIL_INSPECTION,
  STOP_TIMER,
  SUBMIT_TIME_INPUT,
} from "../constants/actionTypes";
import { randomId } from "../helpers/id";

export const resetTimeEpic = (action$) =>
  action$.pipe(
    ofType(changeTrainingType, clearTrainerTimes, removeTrainerTime),
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
      createSaveTime(
        action.payload.ms,
        state,
        action.payload.dnf,
        action.payload.plus2
      )
    )
  );

export const stopTimerEpic = (action$, state$) =>
  action$.pipe(
    ofType(STOP_TIMER),
    withLatestFrom(state$),
    map(([action, state]) =>
      isTraining(state)
        ? saveTrainerTime({
            id: randomId(),
            trainingType: getTrainingType(state),
            caseId: getCurrentCaseId(state),
            ms: action.payload - getStartTime(state),
            timestamp: new Date(),
            scramble: getCurrentScramble(state),
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
    id: randomId(),
    ms,
    date: new Date(),
    scramble: getScramble(state),
    puzzle: getPuzzle(state),
    dnf,
    plus2,
    current: true,
  });
