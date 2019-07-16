import * as storageConstants from '../constants/storage';
import { OLL } from '../constants/trainer';

export function storeEnabledCaseIds(enabledCases) {
  localStorage.setItem(storageConstants.ENABLED_CASE_IDS, JSON.stringify(enabledCases));
}

export function storeActiveTrainingType(type) {
  localStorage.setItem(storageConstants.ACTIVE_TRAINING_TYPE, type);
}

export function storeTrainerTimes(times) {
  localStorage.setItem(storageConstants.TRAINER_TIMES_STORAGE_KEY, JSON.stringify(times));
}

export function getEnabledCaseIds() {
  const rawCaseIds = localStorage.getItem(storageConstants.ENABLED_CASE_IDS);

  const parsedCases = rawCaseIds ? JSON.parse(rawCaseIds) : [];

  if (Array.isArray(parsedCases)) {
    return {
      [OLL]: parsedCases
    };
  }

  return parsedCases;
}

export function getTrainerTimes() {
  const rawTimes = localStorage.getItem(storageConstants.TRAINER_TIMES_STORAGE_KEY);
  return rawTimes ? JSON.parse(rawTimes) || [] : [];
}

export function getActiveTrainingType() {
  return localStorage.getItem(storageConstants.ACTIVE_TRAINING_TYPE) || OLL;
}
