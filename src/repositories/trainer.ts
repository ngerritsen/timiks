import shortid from "shortid";
import * as storageConstants from "../constants/storage";
import { EnabledCaseIds, TrainingTime, TrainingType } from "../types";

export function storeEnabledCaseIds(enabledCases: EnabledCaseIds) {
  localStorage.setItem(
    storageConstants.ENABLED_CASE_IDS,
    JSON.stringify(enabledCases)
  );
}

export function storeActiveTrainingType(type: TrainingType) {
  localStorage.setItem(storageConstants.ACTIVE_TRAINING_TYPE, type);
}

export function storeTrainerTimes(times: TrainingTime[]) {
  localStorage.setItem(
    storageConstants.TRAINER_TIMES_STORAGE_KEY,
    JSON.stringify(times)
  );
}

export function getEnabledCaseIds(): EnabledCaseIds {
  const rawCaseIds = localStorage.getItem(storageConstants.ENABLED_CASE_IDS);

  let parsedCases = rawCaseIds ? JSON.parse(rawCaseIds) : [];

  if (!parsedCases || !(parsedCases.OLL || parsedCases.PLL)) {
    parsedCases = [];
  }

  if (Array.isArray(parsedCases)) {
    return {
      OLL: parsedCases.map(String),
      PLL: [],
    };
  }

  return {
    OLL: (parsedCases.OLL || []).map(String),
    PLL: (parsedCases.PLL || []).map(String),
  };
}

export function getTrainerTimes() {
  const rawTimes = localStorage.getItem(
    storageConstants.TRAINER_TIMES_STORAGE_KEY
  );
  const times = rawTimes ? JSON.parse(rawTimes) || [] : [];

  return times.map((time: TrainingTime) => ({
    ...time,
    scramble: String(time.scramble || ""),
    id: time.id || shortid.generate(),
    timestamp: time.timestamp ? new Date(time.timestamp) : new Date(),
  }));
}

export function getActiveTrainingType() {
  return (localStorage.getItem(storageConstants.ACTIVE_TRAINING_TYPE) ||
    "OLL") as TrainingType;
}
