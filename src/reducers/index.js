import { combineReducers } from 'redux';

import activationReducer from './activationReducer';
import scrambleReducer from './scrambleReducer';
import timerReducer from './timerReducer';
import timesReducer from './timesReducer';

export default combineReducers({
  activation: activationReducer,
  scramble: scrambleReducer,
  timer: timerReducer,
  times: timesReducer
});
