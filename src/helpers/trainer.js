import { pickRandom, generateArr } from './general';
import { parseScramble } from './serialization';
import ollScrambles from '../data/ollScrambles';

export function getCase(cases, id) {
  return cases.find(c => c.id === id);
}

export function getRandomCase(cases, enabledIds = []) {
  if (enabledIds.length === 0) {
    return pickRandom(cases).id;
  }

  return pickRandom(cases.filter(c => enabledIds.includes(c.id))).id;
}

export function getRandomScramble(id, previousIndex) {
  const scrambleCount = ollScrambles[id].length;
  const availableIndices = generateArr(scrambleCount).filter(i => i !== previousIndex);

  return pickRandom(availableIndices);
}

export function getScrambleFor(id, scrambleIndex) {
  return parseScramble(ollScrambles[id][scrambleIndex]);
}

export function selectCases(cases, enabledIds) {
  return cases.map(c => (enabledIds.includes(c.id) ? { ...c, selected: true } : c));
}

export function groupCases(groups, cases) {
  return groups.map(group => ({
    ...group,
    cases: cases.filter(c => getCaseGroupPrefix(c.name) === group.prefix)
  }));
}

function getCaseGroupPrefix(name) {
  const match = name.match(/^([A-Z]+)[0-9]+/);

  return match ? match[1] : '';
}
