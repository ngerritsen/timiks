import { ofType } from 'redux-observable';
import { withLatestFrom, map } from 'rxjs/operators';
import { STOP_TIMER } from '../constants/actionTypes';
import { getRandomCase, getRandomScramble } from '../helpers/trainer';
import { getCurrentScrambleIndex } from '../selectors/trainer';
import { nextCaseDetermined } from '../actions';

export const pickCaseEpic = (action$, state$) =>
  action$.pipe(
    ofType(STOP_TIMER),
    withLatestFrom(state$),
    map(([, state]) => {
      const nextCaseId = getRandomCase();
      const nextScrambleIndex = getRandomScramble(nextCaseId, getCurrentScrambleIndex(state));

      return nextCaseDetermined(nextCaseId, nextScrambleIndex);
    })
  );
