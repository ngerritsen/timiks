import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, tap, map, ignoreElements, mergeMap } from 'rxjs/operators';

import * as authenticationService from '../services/authentication';
import { LOGIN, LOGOUT } from '../constants/actionTypes';
import { loginSucceeded, logoutSucceeded, logoutFailed, loginFailed } from '../actions';

export const loginStatusEpic = () =>
  authenticationService
    .onUserChanged()
    .pipe(
      map(user =>
        user ? loginSucceeded(user.uid, user.displayName, user.email) : logoutSucceeded()
      )
    );

export const loginEpic = action$ =>
  action$.pipe(
    ofType(LOGIN),
    tap(authenticationService.login),
    ignoreElements(),
    catchError(() => of(loginFailed()))
  );

export const logoutEpic = action$ =>
  action$.pipe(
    ofType(LOGOUT),
    mergeMap(() => from(authenticationService.logout())),
    ignoreElements(),
    catchError(() => of(logoutFailed()))
  );
