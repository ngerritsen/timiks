import { pickRandom } from './general';
import { scrambles, OLL, PLL, ALGDB_BASE_URL } from '../constants/trainer';

export function getCase(cases, id) {
  return cases.find(c => c.id === id);
}

export function getRandomCase(cases, enabledIds = []) {
  if (enabledIds.length === 0) {
    return pickRandom(cases).id;
  }

  return pickRandom(cases.filter(c => enabledIds.includes(c.id))).id;
}

export function getRandomScramble(trainingType, caseId) {
  return pickRandom(scrambles[trainingType][caseId]);
}

export function selectCases(cases, enabledIds) {
  return cases.map(c => (enabledIds.includes(c.id) ? { ...c, selected: true } : c));
}

export function groupCases(categories, cases) {
  return categories.map(category => ({
    ...category,
    cases: cases.filter(c => c.category === category.id)
  }));
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
