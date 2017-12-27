import { combineReducers } from 'redux';

import activationReducer from './activationReducer';
import scrambleReducer from './scrambleReducer';
import settingsReducer from './settingsReducer';
import timerReducer from './timerReducer';
import timesReducer from './timesReducer';

export default combineReducers({
  activation: activationReducer,
  scramble: scrambleReducer,
  settings: settingsReducer,
  timer: timerReducer,
  times: timesReducer
});
