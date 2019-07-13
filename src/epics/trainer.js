import { ofType } from 'redux-observable';
import { merge, of, EMPTY } from 'rxjs';
import { withLatestFrom, map, tap, ignoreElements, mergeMap } from 'rxjs/operators';
import * as actionTypes from '../constants/actionTypes';
import { getRandomCase, getRandomScramble } from '../helpers/trainer';
import * as trainerSelectors from '../selectors/trainer';
import { nextCaseDetermined, loadEnabledCases, changeTrainingType } from '../actions';
import * as trainerRepository from '../repositories/trainer';
import { cases } from '../constants/trainer';

const enabledCaseChangeActions = [
  actionTypes.SELECT_CASE,
  actionTypes.DESELECT_CASE,
  actionTypes.SELECT_CASES,
  actionTypes.DESELECT_CASES
];

export const pickCaseEpic = (action$, state$) =>
  merge(
    action$.pipe(
      ofType(
        actionTypes.STOP_TIMER,
        actionTypes.CHANGE_TRAINING_TYPE,
        actionTypes.LOAD_ENABLED_CASES,
        actionTypes.REQUEST_NEXT_CASE,
        ...enabledCaseChangeActions
      )
    ),
    of(null)
  ).pipe(
    withLatestFrom(state$),
    map(([, state]) => {
      const trainingType = trainerSelectors.getTrainingType(state);
      const nextCaseId = getRandomCase(
        cases[trainingType],
        trainerSelectors.getActiveEnabledCases(state)
      );
      const nextScrambleIndex = getRandomScramble(
        trainingType,
        nextCaseId,
        trainerSelectors.getCurrentScrambleIndex(state)
      );

      return nextCaseDetermined(nextCaseId, nextScrambleIndex);
    })
  );

export const loadEnabledCasesEpic = () =>
  of(loadEnabledCases(trainerRepository.getEnabledCaseIds()));

export const restoreActiveTrainingTypeEpic = (_, state$) =>
  of(trainerRepository.getActiveTrainingType()).pipe(
    withLatestFrom(state$),
    mergeMap(([type, state]) =>
      !type || trainerSelectors.getTrainingType(state) === type
        ? EMPTY
        : of(changeTrainingType(type))
    )
  );

export const saveActiveTrainingTypeEpic = action$ =>
  action$.pipe(
    ofType(actionTypes.CHANGE_TRAINING_TYPE),
    tap(action => trainerRepository.storeActiveTrainingType(action.payload)),
    ignoreElements()
  );

export const saveEnabledCasesEpic = (action$, state$) =>
  action$.pipe(
    ofType(...enabledCaseChangeActions),
    withLatestFrom(state$),
    tap(([, state]) =>
      trainerRepository.storeEnabledCaseIds(trainerSelectors.getEnabledCases(state))
    ),
    ignoreElements()
  );
