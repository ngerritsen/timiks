import { pickRandom } from './general';
import { cases, scrambles, OLL, PLL, ALGDB_BASE_URL, categories } from '../constants/trainer';

export function getRandomCase(trainingType, enabledIds = []) {
  if (enabledIds.length === 0) {
    return pickRandom(cases[trainingType]).id;
  }

  return pickRandom(cases[trainingType].filter(c => enabledIds.includes(c.id))).id;
}

export function getRandomScramble(trainingType, caseId) {
  return pickRandom(scrambles[trainingType][caseId]);
}

export function selectCases(trainingType, enabledIds) {
  return cases[trainingType].map(trainingCase =>
    enabledIds.includes(trainingCase.id) ? { ...trainingCase, selected: true } : trainingCase
  );
}

export function groupCases(trainingType, selectedCases) {
  return categories[trainingType].map(category => ({
    ...category,
    cases: selectedCases.filter(c => c.category === category.id)
  }));
}

export function getCasesWithTimes(times, trainingType) {
  const timesForTraining = times.filter(time => time.trainingType === trainingType);

  return cases[trainingType]
    .map(trainingCase => {
      const timesForCase = timesForTraining.filter(time => time.caseId === trainingCase.id);
      const mean =
        timesForCase.reduce((total, time) => time.ms + total, 0) /
        Math.max(timesForCase.length || 1);

      return {
        ...trainingCase,
        times: timesForCase,
        mean
      };
    })
    .filter(trainingCase => trainingCase.times.length > 0);
}

export function buildFullCaseTitle(trainingCase, trainingType) {
  return trainingCase.name + (trainingType === OLL ? ' - #' + trainingCase.id : '');
}

export function buildAlgDbUrl(trainingType, caseId) {
  switch (trainingType) {
    case OLL:
      return ALGDB_BASE_URL + '/puzzle/333/oll/oll' + caseId;
    case PLL:
      return ALGDB_BASE_URL + '/puzzle/333/oll/oll' + caseId;
    default:
      return ALGDB_BASE_URL;
  }
}
