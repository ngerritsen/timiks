import { ofType } from "redux-observable";
import {
  mergeMap,
  withLatestFrom,
  filter,
  map,
  takeUntil,
} from "rxjs/operators";
import { EMPTY, of, merge } from "rxjs";

import * as actionTypes from "../constants/actionTypes";
import * as settingsSelectors from "../selectors/settings";
import * as themeSelectors from "../selectors/theme";
import { setTheme } from "../actions";
import { listenForPreferredTheme, getPreferredTheme } from "../helpers/theme";

export const themeEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.CHANGE_SETTING, actionTypes.LOAD_SETTINGS),
    withLatestFrom(state$),
    mergeMap(([, state]) => {
      const themeSetting = settingsSelectors.getTheme(state);

      if (themeSetting === "auto") {
        return autoChangeTheme(action$, state$);
      }

      return themeSetting !== themeSelectors.getTheme(state)
        ? of(setTheme(themeSetting))
        : EMPTY;
    })
  );

const autoChangeTheme = (action$, state$) =>
  merge(of(getPreferredTheme()), listenForPreferredTheme()).pipe(
    withLatestFrom(state$),
    filter(([theme, state]) => themeSelectors.getTheme(state) !== theme),
    map(([theme]) => setTheme(theme)),
    takeUntil(
      action$.pipe(
        ofType(actionTypes.CHANGE_SETTING, actionTypes.LOAD_SETTINGS)
      )
    )
  );
