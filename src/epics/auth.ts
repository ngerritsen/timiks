import { from, of } from "rxjs";
import {
  catchError,
  tap,
  map,
  mergeMap,
  takeUntil,
  filter,
} from "rxjs/operators";

import * as authService from "../services/auth";
import { dismissLoginPromotion } from "../slices/loginPromotion";
import { showNotification } from "../slices/notifications";
import {
  login,
  loginFailed,
  loginSucceeded,
  logout,
  logoutFailed,
  logoutSucceeded,
} from "../slices/auth";
import { TimiksEpic } from "../types";

export const loginStatusEpic: TimiksEpic = () =>
  authService
    .onUserChanged()
    .pipe(
      mergeMap((user) =>
        user
          ? of(
              loginSucceeded(user),
              dismissLoginPromotion(),
              showNotification({ message: "Logged in" })
            )
          : of(logoutSucceeded())
      )
    );

export const redirectStatusEpic: TimiksEpic = (action$) =>
  authService.onRedirectError().pipe(
    takeUntil(action$.pipe(filter(loginSucceeded.match))),
    mergeMap(() =>
      of(
        loginFailed(),
        showNotification({ message: "Login failed", isError: true })
      )
    )
  );

export const loginEpic: TimiksEpic = (action$) =>
  action$.pipe(
    filter(login.match),
    tap(authService.login),
    map(() => dismissLoginPromotion())
  );

export const logoutEpic: TimiksEpic = (action$) =>
  action$.pipe(
    filter(logout.match),
    mergeMap(() => from(authService.logout())),
    map(() => showNotification({ message: "Logged out" })),
    catchError(() =>
      of(
        logoutFailed(),
        showNotification({ message: "Logout failed", isError: true })
      )
    )
  );
