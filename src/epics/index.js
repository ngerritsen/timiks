import { combineEpics } from 'redux-observable';

import * as noSleepEpics from './noSleep';
import * as scrambleEpics from './scramble';
import * as settingsEpics from './settings';
import * as authenticationEpics from './authentication';
import * as localTimesEpics from './localTimes';
import * as timerEpics from './timer';
import * as activationEpics from './activation';
import * as trainerEpics from './trainer';
import * as timesEpics from './times';
import * as notificationEpics from './notifications';
import * as loginPromotionEpics from './loginPromotionEpic';
import * as versionEpics from './version';
import * as importEpics from './import';

const rootEpic = combineEpics(
  noSleepEpics.enableNoSleepEpic,
  noSleepEpics.disableNoSleepEpic,
  scrambleEpics.scrambleEpic,
  settingsEpics.loadSettingsEpic,
  settingsEpics.storeSettingsEpic,
  authenticationEpics.loginStatusEpic,
  authenticationEpics.loginEpic,
  authenticationEpics.logoutEpic,
  authenticationEpics.redirectStatusEpic,
  localTimesEpics.loadLocalTimesEpic,
  localTimesEpics.storeLocalTimesEpic,
  timerEpics.failInspectionEpic,
  timerEpics.submitTimeEpic,
  timerEpics.stopTimerEpic,
  timerEpics.resetOnRouteEpic,
  activationEpics.initializeActivationEpic,
  activationEpics.prepareActivationEpic,
  activationEpics.fireActivationEpic,
  activationEpics.fireInspectionEpic,
  activationEpics.stopActivationEpic,
  activationEpics.runInspectionEpic,
  activationEpics.warnForInspectionEpic,
  timesEpics.saveTimeEpic,
  timesEpics.loadTimesEpic,
  timesEpics.updateTimeEpic,
  timesEpics.removeTimeEpic,
  timesEpics.archiveTimesEpic,
  timesEpics.clearTimesEpic,
  timesEpics.storeTimesEpic,
  trainerEpics.pickCaseEpic,
  trainerEpics.loadEnabledCasesEpic,
  trainerEpics.saveEnabledCasesEpic,
  trainerEpics.restoreActiveTrainingTypeEpic,
  trainerEpics.saveActiveTrainingTypeEpic,
  trainerEpics.storeTrainerTimesEpic,
  trainerEpics.loadTrainerTimesEpic,
  notificationEpics.notificationEpic,
  loginPromotionEpics.loginPromotionEpic,
  loginPromotionEpics.dismissLoginPromotionEpic,
  versionEpics.newVersionEpic,
  importEpics.importTimesEpic
);

export default rootEpic;
