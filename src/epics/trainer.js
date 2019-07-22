import { ofType } from 'redux-observable';
import { merge, of, EMPTY } from 'rxjs';
import { withLatestFrom, map, tap, ignoreElements, mergeMap } from 'rxjs/operators';
import * as actionTypes from '../constants/actionTypes';
import { getRandomCase, getRandomScramble } from '../helpers/trainer';
import * as trainerSelectors from '../selectors/trainer';
import * as actions from '../actions';
import * as trainerRepository from '../repositories/trainer';

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
        actionTypes.SAVE_TRAINER_TIME,
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
      const nextCaseId = getRandomCase(trainingType, trainerSelectors.getActiveEnabledCases(state));
      const nextScramble = getRandomScramble(trainingType, nextCaseId);

      return actions.nextCaseDetermined(nextCaseId, nextScramble);
    })
  );

export const loadTrainerTimesEpic = () =>
  of(actions.loadTrainerTimes(trainerRepository.getTrainerTimes()));

export const storeTrainerTimesEpic = (action$, state$) =>
  action$.pipe(
    ofType(
      actionTypes.SAVE_TRAINER_TIME,
      actionTypes.CLEAR_TRAINER_TIMES,
      actionTypes.REMOVE_TRAINER_TIME
    ),
    withLatestFrom(state$),
    tap(([, state]) =>
      trainerRepository.storeTrainerTimes(trainerSelectors.getTrainerTimes(state))
    ),
    ignoreElements()
  );

export const loadEnabledCasesEpic = () =>
  of(actions.loadEnabledCases(trainerRepository.getEnabledCaseIds()));

export const restoreActiveTrainingTypeEpic = (_, state$) =>
  of(trainerRepository.getActiveTrainingType()).pipe(
    withLatestFrom(state$),
    mergeMap(([type, state]) =>
      !type || trainerSelectors.getTrainingType(state) === type
        ? EMPTY
        : of(actions.changeTrainingType(type))
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
