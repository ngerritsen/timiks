import { ofType } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, tap, map, mergeMap, takeUntil } from "rxjs/operators";

import * as authenticationService from "../services/authentication";
import { LOGIN, LOGIN_SUCCEEDED, LOGOUT } from "../constants/actionTypes";
import * as actions from "../actions";
import { dismissLoginPromotion } from "../slices/loginPromotion";

export const loginStatusEpic = () =>
  authenticationService
    .onUserChanged()
    .pipe(
      mergeMap((user) =>
        user
          ? of(
              actions.loginSucceeded(
                user.uid,
                user.displayName,
                user.email,
                user.photoURL
              ),
              dismissLoginPromotion(),
              actions.showNotification("Logged in")
            )
          : of(actions.logoutSucceeded())
      )
    );

export const redirectStatusEpic = (action$) =>
  authenticationService.onRedirectError().pipe(
    takeUntil(action$.pipe(ofType(LOGIN_SUCCEEDED))),
    mergeMap(() =>
      of(actions.loginFailed(), actions.showNotification("Login failed", true))
    )
  );

export const loginEpic = (action$) =>
  action$.pipe(
    ofType(LOGIN),
    tap(authenticationService.login),
    map(dismissLoginPromotion)
  );

export const logoutEpic = (action$) =>
  action$.pipe(
    ofType(LOGOUT),
    mergeMap(() => from(authenticationService.logout())),
    map(() => actions.showNotification("Logged out")),
    catchError(() =>
      of(
        actions.logoutFailed(),
        actions.showNotification("Logout failed", true)
      )
    )
  );
