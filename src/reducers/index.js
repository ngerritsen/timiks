import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import activation from './activation';
import authentication from './authentication';
import scramble from './scramble';
import settings from './settings';
import timer from './timer';
import times from './times';
import notifications from './notifications';
import loginPromotion from './loginPromotion';
import trainer from './trainer';
import network from './network';
import version from './version';
import history from '../history';

export default combineReducers({
  router: connectRouter(history),
  activation,
  authentication,
  scramble,
  settings,
  timer,
  times,
  trainer,
  network,
  notifications,
  loginPromotion,
  version
});
