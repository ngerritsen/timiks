import { Action } from "redux";
import { RootState } from "./store";
import { Epic } from "redux-observable";
import { Color } from "./theme";

export type StatTime = {
  ms: number;
  includedIds?: string[];
  excludedIds?: string[];
};

export type StatType = "AVERAGE" | "STANDARD_DEVIATION" | "SINGLE" | "MEAN";

export interface StatConfig {
  name: string;
  size: number;
  type: StatType;
  showInGraph?: boolean;
  color: Color;
}

export interface Stat extends StatConfig {
  trim: number;
  graphLineColor: Color;
  all: StatTime[];
  current?: StatTime;
  best: StatTime;
}

export interface Time {
  date: Date;
  dnf?: boolean;
  id: string;
  ms: number;
  timestamp: Date;
  plus2?: boolean;
  puzzle: string;
  scramble: string;
  stored?: boolean;
  dirty?: boolean;
  comment?: string;
}

export type GraphLine = {
  name: string;
  enabled: boolean;
  color: Color;
};

export type PreviewArrows = (number[] | boolean)[][];

export type TrainingType = "OLL" | "PLL";

export interface TrainingTime extends Time {
  caseId: string;
  trainingType: string;
}

export type Case = {
  name: string;
  mean?: number;
  algs: string[];
  probability: number;
  selected?: boolean;
  id: string;
  category: string;
  preview: string;
  previewArrows?: PreviewArrows;
};

export type EnabledCaseIds = {
  [K in TrainingType]: string[];
};

export interface CaseWithTimes extends Case {
  times: TrainingTime[];
}

export interface CaseCategory {
  name: string;
  id: string;
}

export interface CaseCategoryWithCases extends CaseCategory {
  cases: Case[];
}

export type MatchPattern = {
  regex: RegExp;
  fields: string[];
};

export type TimiksEpic = Epic<Action, Action, RootState>;

export type PuzzleType =
  | "STATIC"
  | "CUBE"
  | "CLOCK"
  | "SQUARE_ONE"
  | "TETRAHEDRON"
  | "DODECAHEDRON"
  | "SKEWB"
  | "RELAY";

export type JsssScramblerType =
  | "222"
  | "333"
  | "444"
  | "555"
  | "666"
  | "777"
  | "minx"
  | "pyram"
  | "sq1";

export type JsssScramble = {
  scramble_string: string;
};

export type JsssScrambler = {
  getRandomScramble: () => JsssScramble;
};

export type CubeDirection = "U" | "D" | "F" | "R" | "L" | "B";
export type StaticDirection = "x" | "y" | "z";
export type PuzzleDirection = CubeDirection | StaticDirection;
export type PuzzleColor = "W" | "Y" | "R" | "O" | "G" | "B" | "X";

export type ScrambleOptions<T extends CubeDirection | StaticDirection> = {
  jsssScrambler?: JsssScramblerType;
  length?: number;
  directions?: T[];
  puzzles?: string[];
};

export type Puzzle = {
  name: string;
  title: string;
  type: PuzzleType;
  size?: number;
  allowInspectionTime?: boolean;
  scrambleOptions?: ScrambleOptions<CubeDirection | StaticDirection>;
};

export type SelectOption<T> = {
  label: string;
  value: T;
};

export type ThemeSetting = "dark" | "light" | "auto";
export type ThemeType = "dark" | "light";

export type CubeTile = { x: number; y: number; color: PuzzleColor };
export type CubeFace = CubeTile[];
export type Cube = Record<CubeDirection, CubeFace>;
