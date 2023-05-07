import { ofType } from "redux-observable";
import { merge, of, EMPTY } from "rxjs";
import {
  withLatestFrom,
  map,
  tap,
  ignoreElements,
  mergeMap,
  filter,
} from "rxjs/operators";
import { getRandomCase, getRandomScramble } from "../helpers/trainer";
import * as trainerSelectors from "../selectors/trainer";
import * as trainerRepository from "../repositories/trainer";
import {
  nextCaseDetermined,
  clearTrainerTimes,
  changeTrainingType,
  deselectCase,
  deselectCases,
  loadEnabledCases,
  loadTrainerTimes,
  removeTrainerTime,
  saveTrainerTime,
  startRehearsal,
  selectCase,
  retryCase,
  selectCases,
  stopRehearsal,
} from "../slices/trainer";
import { TimiksEpic } from "../types";

export const stopRehearsalEpic: TimiksEpic = (action$, state$) =>
  merge(
    action$.pipe(ofType(changeTrainingType)),
    action$.pipe(
      filter(saveTrainerTime.match),
      withLatestFrom(state$),
      mergeMap(([, state]) =>
        trainerSelectors.isInRehearsal(state) &&
        trainerSelectors.getRemainingRehearsalCaseIds(state).length === 0
          ? of(1)
          : EMPTY
      )
    )
  ).pipe(map(() => stopRehearsal()));

export const pickCaseEpic: TimiksEpic = (action$, state$) =>
  merge(
    action$.pipe(
      ofType(
        String(selectCase),
        String(deselectCase),
        String(selectCases),
        String(deselectCases),
        String(loadEnabledCases),
        String(clearTrainerTimes),
        String(saveTrainerTime),
        String(removeTrainerTime),
        String(changeTrainingType),
        String(startRehearsal)
      )
    ),
    of(null)
  ).pipe(
    withLatestFrom(state$),
    map(([, state]) => {
      const trainingType = trainerSelectors.getTrainingType(state);
      const eligableCaseIds =
        trainerSelectors.isInRehearsal(state) &&
        trainerSelectors.getRemainingRehearsalCaseIds(state).length > 0
          ? trainerSelectors.getRemainingRehearsalCaseIds(state)
          : trainerSelectors.getSelectedCaseIds(state);

      const nextCaseId = getRandomCase(trainingType, eligableCaseIds);
      const nextScramble = getRandomScramble(trainingType, nextCaseId);

      return nextCaseDetermined({ id: nextCaseId, scramble: nextScramble });
    })
  );

export const retryCaseEpic: TimiksEpic = (action$) =>
  action$.pipe(
    filter(retryCase.match),
    map((action) =>
      nextCaseDetermined({
        id: action.payload.caseId,
        scramble: getRandomScramble(
          action.payload.trainingType,
          action.payload.caseId
        ),
      })
    )
  );

export const loadTrainerTimesEpic: TimiksEpic = () =>
  of(loadTrainerTimes(trainerRepository.getTrainerTimes()));
export const storeTrainerTimesEpic: TimiksEpic = (action$, state$) =>
  action$.pipe(
    ofType(
      String(saveTrainerTime),
      String(clearTrainerTimes),
      String(removeTrainerTime)
    ),
    withLatestFrom(state$),
    tap(([, state]) =>
      trainerRepository.storeTrainerTimes(
        trainerSelectors.getTrainerTimes(state)
      )
    ),
    ignoreElements()
  );

export const loadEnabledCasesEpic: TimiksEpic = () =>
  of(loadEnabledCases(trainerRepository.getEnabledCaseIds()));

export const restoreActiveTrainingTypeEpic: TimiksEpic = (_, state$) =>
  of(trainerRepository.getActiveTrainingType()).pipe(
    withLatestFrom(state$),
    mergeMap(([type, state]) =>
      !type || trainerSelectors.getTrainingType(state) === type
        ? EMPTY
        : of(changeTrainingType(type))
    )
  );

export const saveActiveTrainingTypeEpic: TimiksEpic = (action$) =>
  action$.pipe(
    filter(changeTrainingType.match),
    map((action) => {
      trainerRepository.storeActiveTrainingType(action.payload);
    }),
    ignoreElements()
  );

export const saveEnabledCasesEpic: TimiksEpic = (action$, state$) =>
  action$.pipe(
    ofType(
      String(selectCase),
      String(deselectCase),
      String(selectCases),
      String(deselectCases)
    ),
    withLatestFrom(state$),
    tap(([, state]) =>
      trainerRepository.storeEnabledCaseIds(
        trainerSelectors.getEnabledCases(state)
      )
    ),
    ignoreElements()
  );
