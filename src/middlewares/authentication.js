import * as authenticationService from '../services/authentication';
import { LOGIN, LOGOUT } from '../constants/actionTypes';
import { loginSucceeded, logoutSucceeded, logoutFailed } from '../actions';

const authentication = store => next => {
  authenticationService.onLoggedIn(user => {
    if (user) {
      store.dispatch(loginSucceeded(user.uid, user.displayName, user.email));
    }

    logoutSucceeded();
  });

  return action => {
    if (action.type === LOGIN) {
      authenticationService.login();
    }

    if (action.type === LOGOUT) {
      authenticationService
        .logout()
        .then(() => store.dispatch(logoutSucceeded()))
        .catch(() => store.dispatch(logoutFailed()));
    }

    return next(action);
  };
};

export default authentication;
