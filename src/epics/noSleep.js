import { ofType } from 'redux-observable';
import { tap, map } from 'rxjs/operators';

import * as noSleepService from '../services/noSleep';
import * as actionTypes from '../constants/actionTypes';
import { noSleepDisabled, noSleepEnabled } from '../actions';

export const enableNoSleepEpic = action$ =>
  action$.pipe(
    ofType([actionTypes.PREPARE_ACTIVATION, actionTypes.SKIP_PREPARATION_STAGE]),
    tap(noSleepService.enable),
    map(noSleepEnabled)
  );

export const disableNoSleepEpic = action$ =>
  action$.pipe(
    ofType([actionTypes.RESET_ACTIVATION, actionTypes.STOP_TIMER]),
    tap(noSleepService.disable),
    map(noSleepDisabled)
  );
