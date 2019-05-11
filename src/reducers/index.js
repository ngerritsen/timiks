import { combineReducers } from 'redux';

import activationReducer from './activation';
import modal from './modal';
import scrambleReducer from './scramble';
import settingsReducer from './settings';
import timerReducer from './timer';
import timesReducer from './times';

export default combineReducers({
  activation: activationReducer,
  modal: modal,
  scramble: scrambleReducer,
  settings: settingsReducer,
  timer: timerReducer,
  times: timesReducer
});
