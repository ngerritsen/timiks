import * as authenticationService from '../services/authentication';
import { LOGIN } from '../constants/actionTypes';
import { loginSucceeded } from '../actions';

const authentication = store => next => {
  authenticationService.verifyLogin();

  authenticationService.onLoggedIn(user => {
    if (user) {
      store.dispatch(loginSucceeded(user));
      alert('Logged in ' + user.uid);
    }
  });

  return action => {
    if (action.type === LOGIN) {
      authenticationService.login();
    }

    return next(action);
  };
};

export default authentication;
