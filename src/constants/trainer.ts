import * as oll from "./oll";
import * as pll from "./pll";
import ollScrambles from "../scrambles/oll";
import pllScrambles from "../scrambles/pll";
import { TrainingType } from "../types";

export const ALGDB_BASE_URL = "http://algdb.net";
export const types: TrainingType[] = ["OLL", "PLL"];

export const cases = { OLL: oll.cases, PLL: pll.cases };
export const categories = { OLL: oll.categories, PLL: pll.categories };
export const scrambles = { OLL: ollScrambles, PLL: pllScrambles };
