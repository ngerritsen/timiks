import { map, withLatestFrom, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { ofType } from 'redux-observable';
import { IMPORT_TIMES } from '../constants/actionTypes';
import { showNotification } from '../actions';
import { getUserId, isLoggedIn } from '../selectors/authentication';
import * as timesRepository from '../repositories/times';

export const importTimesEpic = (action$, state$) =>
  action$.pipe(
    ofType(IMPORT_TIMES),
    withLatestFrom(state$),
    mergeMap(([action, state]) =>
      from(
        isLoggedIn(state) ? timesRepository.saveAll(getUserId(state), action.payload.times) : null
      ).pipe(map(() => showNotification(`Imported ${action.payload.times.length} times.`)))
    )
  );
