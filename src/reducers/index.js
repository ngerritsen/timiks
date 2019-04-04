import { combineReducers } from 'redux';

import activationReducer from './activationReducer';
import modalReducer from './modalReducer';
import scrambleReducer from './scrambleReducer';
import settingsReducer from './settingsReducer';
import timerReducer from './timerReducer';
import timesReducer from './timesReducer';

export default combineReducers({
  activation: activationReducer,
  modal: modalReducer,
  scramble: scrambleReducer,
  settings: settingsReducer,
  timer: timerReducer,
  times: timesReducer
});
