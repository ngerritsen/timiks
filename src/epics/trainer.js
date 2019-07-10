import { ofType } from 'redux-observable';
import { merge, of } from 'rxjs';
import { withLatestFrom, map, tap, ignoreElements } from 'rxjs/operators';
import { STOP_TIMER, SELECT_CASE, DESELECT_CASE } from '../constants/actionTypes';
import { getRandomCase, getRandomScramble } from '../helpers/trainer';
import { getCurrentScrambleIndex, getEnabledCases } from '../selectors/trainer';
import { nextCaseDetermined, loadEnabledCases } from '../actions';
import * as oll from '../constants/oll';
import * as trainerRepository from '../repositories/trainer';

export const pickCaseEpic = (action$, state$) =>
  merge(action$.pipe(ofType(STOP_TIMER, SELECT_CASE, DESELECT_CASE)), of(null)).pipe(
    withLatestFrom(state$),
    map(([, state]) => {
      const nextCaseId = getRandomCase(oll.cases, getEnabledCases(state));
      const nextScrambleIndex = getRandomScramble(nextCaseId, getCurrentScrambleIndex(state));

      return nextCaseDetermined(nextCaseId, nextScrambleIndex);
    })
  );

export const loadEnabledCasesEpic = () =>
  of(loadEnabledCases(trainerRepository.getEnabledCaseIds()));

export const saveEnabledCasesEpic = (action$, state$) =>
  action$.pipe(
    ofType(SELECT_CASE, DESELECT_CASE),
    withLatestFrom(state$),
    tap(([, state]) => trainerRepository.storeEnabledCaseIds(getEnabledCases(state))),
    ignoreElements()
  );
