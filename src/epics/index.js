import { combineEpics } from 'redux-observable';

import { enableNoSleepEpic, disableNoSleepEpic } from './noSleep';
import { rescrambleEpic, scrambleEpic } from './scramble';
import { loadSettingsEpic, storeSettingsEpic } from './settings';
import { loginEpic, loginStatusEpic, logoutEpic } from './authentication';
import { loadTimesEpic, storeTimesEpic } from './times';
import { failInspectionEpic, stopTimerEpic, submitTimeEpic } from './timer';

const rootEpic = combineEpics(
  enableNoSleepEpic,
  disableNoSleepEpic,
  scrambleEpic,
  rescrambleEpic,
  loadSettingsEpic,
  storeSettingsEpic,
  loginStatusEpic,
  loginEpic,
  logoutEpic,
  loadTimesEpic,
  storeTimesEpic,
  failInspectionEpic,
  submitTimeEpic,
  stopTimerEpic
);

export default rootEpic;
