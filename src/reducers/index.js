import { combineReducers } from 'redux';

import activationReducer from './activationReducer';
import archiveReducer from './archiveReducer';
import modalReducer from './modalReducer';
import scrambleReducer from './scrambleReducer';
import settingsReducer from './settingsReducer';
import timerReducer from './timerReducer';
import timesReducer from './timesReducer';

export default combineReducers({
  activation: activationReducer,
  archive: archiveReducer,
  modal: modalReducer,
  scramble: scrambleReducer,
  settings: settingsReducer,
  timer: timerReducer,
  times: timesReducer
});
