import { ofType } from 'redux-observable';
import { tap, withLatestFrom, map } from 'rxjs/operators';
import { of } from 'rxjs';

import * as actionTypes from '../constants/actionTypes';
import { loadSettings, settingsStored } from '../actions';
import * as settingsRepository from '../repositories/settings';
import { getSettings } from '../selectors/settings';

export const loadSettingsEpic = () => of(loadSettings(settingsRepository.get()));

export const storeSettingsEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.CHANGE_SETTING),
    withLatestFrom(state$),
    tap(([, state]) => settingsRepository.store(getSettings(state))),
    map(settingsStored)
  );
