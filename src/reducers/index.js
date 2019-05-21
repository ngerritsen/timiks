import { combineReducers } from 'redux';

import activation from './activation';
import authentication from './authentication';
import scramble from './scramble';
import settings from './settings';
import timer from './timer';
import times from './times';
import notifications from './notifications';
import loginPromotion from './loginPromotion';

export default combineReducers({
  activation,
  authentication,
  scramble,
  settings,
  timer,
  times,
  notifications,
  loginPromotion
});
