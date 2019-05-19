import { combineEpics } from 'redux-observable';

import * as noSleepEpics from './noSleep';
import * as scrambleEpics from './scramble';
import * as settingsEpics from './settings';
import * as authenticationEpics from './authentication';
import * as localTimesEpics from './localTimes';
import * as timerEpics from './timer';
import * as activationEpics from './activation';
import * as timesEpics from './times';

const rootEpic = combineEpics(
  noSleepEpics.enableNoSleepEpic,
  noSleepEpics.disableNoSleepEpic,
  scrambleEpics.scrambleEpic,
  scrambleEpics.rescrambleEpic,
  settingsEpics.loadSettingsEpic,
  settingsEpics.storeSettingsEpic,
  authenticationEpics.loginStatusEpic,
  authenticationEpics.loginEpic,
  authenticationEpics.logoutEpic,
  localTimesEpics.loadLocalTimesEpic,
  localTimesEpics.storeLocalTimesEpic,
  timerEpics.failInspectionEpic,
  timerEpics.submitTimeEpic,
  timerEpics.stopTimerEpic,
  activationEpics.initializeActivationEpic,
  activationEpics.prepareActivationEpic,
  activationEpics.fireActivationEpic,
  activationEpics.fireInspectionEpic,
  activationEpics.stopActivationEpic,
  activationEpics.runInspectionEpic,
  timesEpics.storeTimeEpic,
  timesEpics.loadTimesEpic,
  timesEpics.updateTimeEpic,
  timesEpics.removeTimeEpic,
  timesEpics.archiveTimesEpic,
  timesEpics.clearTimesEpic,
  timesEpics.storeTimesEpic
);

export default rootEpic;
