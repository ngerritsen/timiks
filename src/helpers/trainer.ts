import { pickRandom } from "./general";
import {
  cases,
  scrambles,
  ALGDB_BASE_URL,
  categories,
} from "../constants/trainer";
import { Case, TrainingTime, TrainingType } from "../types";

export function getCase(trainingType: TrainingType, caseId: string): Case {
  return cases[trainingType].find((trainingCase) => trainingCase.id === caseId);
}

export function getRandomCase(
  trainingType: TrainingType,
  selectCaseIds: string[]
) {
  return pickRandom(
    cases[trainingType].filter((c) => selectCaseIds.includes(c.id))
  ).id;
}

export function getSelectedCaseIds(
  trainingType: TrainingType,
  enabledIds: string[]
) {
  return cases[trainingType]
    .filter(
      (trainingCase) =>
        enabledIds.length === 0 || enabledIds.includes(trainingCase.id)
    )
    .map((trainingCase) => trainingCase.id);
}

export function getRemainingRehearsalCaseIds(
  selectedCaseIds: string[],
  rehearsedCaseIds: string[]
) {
  return selectedCaseIds.filter((id) => !rehearsedCaseIds.includes(id));
}

export function getRandomScramble(trainingType: TrainingType, caseId: string) {
  return pickRandom<number>(scrambles[trainingType][caseId]);
}

export function selectCases(trainingType: TrainingType, enabledIds: string[]) {
  return cases[trainingType].map((trainingCase) =>
    enabledIds.includes(trainingCase.id)
      ? { ...trainingCase, selected: true }
      : trainingCase
  );
}

export function getLastCase(times: TrainingTime[], trainingType: TrainingType) {
  const timesForTraining = times.filter(
    (time) => time.trainingType === trainingType
  );

  if (timesForTraining.length === 0) {
    return undefined;
  }

  const lastTime = timesForTraining.sort((a, b) =>
    Math.sign(b.timestamp.getTime() - a.timestamp.getTime())
  )[0];

  return getCase(trainingType, lastTime.caseId);
}

export function getAvailableCaseIds(trainingType: TrainingType) {
  return cases[trainingType].map((c) => c.id);
}

export function groupCases(trainingType: TrainingType, selectedCases: Case[]) {
  return categories[trainingType].map((category) => ({
    ...category,
    cases: selectedCases.filter((c) => c.category === category.id),
  }));
}

export function getCasesWithTimes(
  times: TrainingTime[],
  trainingType: TrainingType
) {
  const timesForTraining = times.filter(
    (time) => time.trainingType === trainingType
  );

  return cases[trainingType]
    .map((trainingCase) => {
      const timesForCase = timesForTraining
        .filter((time) => time.caseId === trainingCase.id)
        .sort((a, b) =>
          Math.sign(b.timestamp.getTime() - a.timestamp.getTime())
        );

      const mean =
        timesForCase.reduce((total, time) => time.ms + total, 0) /
        Math.max(timesForCase.length || 1);

      return {
        ...trainingCase,
        times: timesForCase,
        mean,
      };
    })
    .filter((trainingCase) => trainingCase.times.length > 0);
}

export function buildFullCaseTitle(
  trainingCase: Case,
  trainingType: TrainingType
) {
  return (
    trainingCase.name + (trainingType === "OLL" ? " - #" + trainingCase.id : "")
  );
}

export function buildAlgDbUrl(trainingType: TrainingType, caseId: string) {
  switch (trainingType) {
    case "OLL":
      return ALGDB_BASE_URL + "/puzzle/333/oll/oll" + caseId;
    case "PLL":
      return ALGDB_BASE_URL + "/puzzle/333/pll/" + caseId;
    default:
      return ALGDB_BASE_URL;
  }
}
