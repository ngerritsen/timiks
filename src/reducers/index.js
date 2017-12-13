import { combineReducers } from 'redux';

import activationReducer from './activationReducer';
import scrambleReducer from './scrambleReducer';
import timerReducer from './timerReducer';

export default combineReducers({
  timer: timerReducer,
  scramble: scrambleReducer,
  activation: activationReducer
});
