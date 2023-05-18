import { withLatestFrom, map, filter } from "rxjs/operators";
import { ofType } from "redux-observable";

import { saveTime } from "../slices/times";
import {
  changeTrainingType,
  clearTrainerTimes,
  removeTrainerTime,
  saveTrainerTime,
} from "../slices/trainer";
import { getPuzzle } from "../selectors/settings";
import {
  getStartTime,
  getTimerState,
  hasInspectionPenalty,
} from "../selectors/timer";
import { getScramble } from "../selectors/scramble";
import {
  getTrainingType,
  getCurrentCaseId,
  getCurrentScramble,
} from "../selectors/trainer";
import { randomId } from "../helpers/id";
import { TimiksEpic } from "../types";
import {
  failInspection,
  resetTime,
  stopTimer,
  submitTimeInput,
} from "../slices/timer";
import { RootState } from "../store";
import { DEFAULT_PUZZLE } from "../constants/settings";

export const resetTimeEpic: TimiksEpic = (action$) =>
  action$.pipe(
    ofType(
      changeTrainingType.toString(),
      clearTrainerTimes.toString(),
      removeTrainerTime.toString()
    ),
    map(() => resetTime())
  );

export const failInspectionEpic: TimiksEpic = (action$, state$) =>
  action$.pipe(
    filter(failInspection.match),
    withLatestFrom(state$),
    map(([, state]) => createSaveTime(0, state, true, false))
  );

export const submitTimeEpic: TimiksEpic = (action$, state$) =>
  action$.pipe(
    filter(submitTimeInput.match),
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

export const stopTimerEpic: TimiksEpic = (action$, state$) =>
  action$.pipe(
    filter(stopTimer.match),
    withLatestFrom(state$),
    map(([action, state]) =>
      getTimerState(state).isTraining
        ? saveTrainerTime({
            id: randomId(),
            trainingType: getTrainingType(state),
            caseId: getCurrentCaseId(state),
            ms: action.payload - getStartTime(state),
            timestamp: new Date(),
            scramble: getCurrentScramble(state),
            date: new Date(),
            puzzle: DEFAULT_PUZZLE,
          })
        : createSaveTime(
            action.payload - getStartTime(state),
            state,
            false,
            hasInspectionPenalty(state)
          )
    )
  );

const createSaveTime = (
  ms: number,
  state: RootState,
  dnf: boolean,
  plus2: boolean
) =>
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
