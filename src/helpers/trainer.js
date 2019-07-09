import ollCases from '../constants/oll';
import { pickRandom, generateArr } from './general';
import { parseScramble } from './serialization';

export function getCase(caseId) {
  return ollCases.find(c => c.id === caseId);
}

export function getRandomCase() {
  return pickRandom(ollCases).id;
}

export function getRandomScramble(caseId, previousIndex) {
  const scrambleCount = getCase(caseId).scrambles.length;
  const availableIndices = generateArr(scrambleCount).filter(i => i !== previousIndex);
  return pickRandom(availableIndices);
}

export function getScrambleFor(caseId, scrambleIndex) {
  return parseScramble(getCase(caseId).scrambles[scrambleIndex]);
}
