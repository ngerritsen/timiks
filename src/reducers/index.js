import { combineReducers } from 'redux';

import activationReducer from './activationReducer';
import archiveReducer from './archiveReducer';
import scrambleReducer from './scrambleReducer';
import settingsReducer from './settingsReducer';
import timerReducer from './timerReducer';
import timesReducer from './timesReducer';
import statsReducer from './statsReducer';

export default combineReducers({
  activation: activationReducer,
  archive: archiveReducer,
  scramble: scrambleReducer,
  settings: settingsReducer,
  timer: timerReducer,
  times: timesReducer,
  stats: statsReducer
});
