import * as oll from "./oll";
import * as pll from "./pll";
import ollScrambles from "../scrambles/oll";
import pllScrambles from "../scrambles/pll";
import { Case, CaseCategory, TrainerScrambles, TrainingType } from "../types";

export const SPEEDCUBE_DB_BASE_URL = "https://speedcubedb.com";
export const types: TrainingType[] = ["OLL", "PLL"];

export const cases: Record<TrainingType, Case[]> = {
  OLL: oll.cases,
  PLL: pll.cases,
};

export const categories: Record<TrainingType, CaseCategory[]> = {
  OLL: oll.categories,
  PLL: pll.categories,
};

export const scrambles: Record<TrainingType, TrainerScrambles> = {
  OLL: ollScrambles,
  PLL: pllScrambles,
};
