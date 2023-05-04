import shortid from "shortid";
import { withLatestFrom, map } from "rxjs/operators";
import { ofType } from "redux-observable";

import * as actionTypes from "../constants/actionTypes";
import { saveTime, resetTime, saveTrainerTime } from "../actions";
import { getPuzzle } from "../selectors/settings";
import { getStartTime, hasInspectionPenalty, isTraining } from "../selectors/timer";
import { getScramble } from "../selectors/scramble";
import {
  getTrainingType,
  getCurrentCaseId,
  getCurrentScramble,
} from "../selectors/trainer";

export const resetTimeEpic = (action$) =>
  action$.pipe(
    ofType(
      actionTypes.CHANGE_TRAINING_TYPE,
      actionTypes.CLEAR_TRAINER_TIMES,
      actionTypes.REMOVE_TRAINER_TIME
    ),
    map(resetTime)
  );

export const failInspectionEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.FAIL_INSPECTION),
    withLatestFrom(state$),
    map(([, state]) => createSaveTime(0, state, true))
  );

export const submitTimeEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.SUBMIT_TIME_INPUT),
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
    ofType(actionTypes.STOP_TIMER),
    withLatestFrom(state$),
    map(([action, state]) =>
      isTraining(state)
        ? saveTrainerTime({
            id: shortid.generate(),
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
    id: shortid.generate(),
    ms,
    date: new Date(),
    scramble: getScramble(state),
    puzzle: getPuzzle(state),
    dnf,
    plus2,
    current: true,
  });
