import { combineEpics } from "redux-observable";

import * as activationEpics from "./activation";
import * as authenticationEpics from "./authentication";
import * as importEpics from "./import";
import * as localTimesEpics from "./localTimes";
import * as loginPromotionEpics from "./loginPromotionEpic";
import * as networkEpics from "./network";
import * as noSleepEpics from "./noSleep";
import * as notificationEpics from "./notifications";
import * as scrambleEpics from "./scramble";
import * as settingsEpics from "./settings";
import * as timerEpics from "./timer";
import * as timesEpics from "./times";
import * as trainerEpics from "./trainer";
import * as versionEpics from "./version";

const rootEpic = combineEpics(
  activationEpics.fireActivationEpic,
  activationEpics.fireInspectionEpic,
  activationEpics.initializeActivationEpic,
  activationEpics.prepareActivationEpic,
  activationEpics.runInspectionEpic,
  activationEpics.stopActivationEpic,
  activationEpics.warnForInspectionEpic,
  authenticationEpics.loginEpic,
  authenticationEpics.loginStatusEpic,
  authenticationEpics.logoutEpic,
  authenticationEpics.redirectStatusEpic,
  importEpics.importTimesEpic,
  localTimesEpics.loadLocalTimesEpic,
  localTimesEpics.storeLocalTimesEpic,
  loginPromotionEpics.dismissLoginPromotionEpic,
  loginPromotionEpics.loginPromotionEpic,
  networkEpics.offlineEpic,
  networkEpics.onlineEpic,
  noSleepEpics.disableNoSleepEpic,
  noSleepEpics.enableNoSleepEpic,
  notificationEpics.notificationEpic,
  scrambleEpics.scrambleEpic,
  settingsEpics.loadSettingsEpic,
  settingsEpics.storeSettingsEpic,
  timerEpics.failInspectionEpic,
  timerEpics.resetTimeEpic,
  timerEpics.stopTimerEpic,
  timerEpics.submitTimeEpic,
  timesEpics.archiveTimesEpic,
  timesEpics.clearTimesEpic,
  timesEpics.loadTimesEpic,
  timesEpics.removeTimeEpic,
  timesEpics.saveTimeEpic,
  timesEpics.storeTimesEpic,
  timesEpics.updateTimeEpic,
  trainerEpics.loadEnabledCasesEpic,
  trainerEpics.loadTrainerTimesEpic,
  trainerEpics.pickCaseEpic,
  trainerEpics.restoreActiveTrainingTypeEpic,
  trainerEpics.retryCaseEpic,
  trainerEpics.saveActiveTrainingTypeEpic,
  trainerEpics.saveEnabledCasesEpic,
  trainerEpics.stopRehearsalEpic,
  trainerEpics.storeTrainerTimesEpic,
  versionEpics.newVersionEpic
);

export default rootEpic;
