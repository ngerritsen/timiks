import * as storageConstants from '../constants/storage';

export function storeEnabledCaseIds(enabledCaseIds) {
  localStorage.setItem(storageConstants.ENABLED_CASE_IDS, JSON.stringify(enabledCaseIds));
}

export function getEnabledCaseIds() {
  const rawCaseIds = localStorage.getItem(storageConstants.ENABLED_CASE_IDS);

  return rawCaseIds ? JSON.parse(rawCaseIds) : [];
}
