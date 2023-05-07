import { ofType } from "redux-observable";
import { tap, withLatestFrom, ignoreElements } from "rxjs/operators";
import { of } from "rxjs";

import { loadSettings, changeSetting } from "../slices/settings";
import * as settingsRepository from "../repositories/settings";
import { getSettings } from "../selectors/settings";
import { TimiksEpic } from "../types";

export const loadSettingsEpic: TimiksEpic = () =>
  of(loadSettings(settingsRepository.get()));

export const storeSettingsEpic: TimiksEpic = (action$, state$) =>
  action$.pipe(
    ofType(changeSetting),
    withLatestFrom(state$),
    tap(([, state]) => settingsRepository.store(getSettings(state))),
    ignoreElements()
  );
