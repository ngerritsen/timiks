import { MatchPattern } from "../types";

type Sign = -1 | 0 | 1;
type Sorter = <T extends Record<string, unknown>>(a: T, b: T) => Sign;

export function generateArr(n: number): number[] {
  const arr = new Array(n);

  for (let i = 0; i < n; i++) {
    arr[i] = i;
  }

  return arr;
}

export function createAscSorter(property: string): Sorter {
  return (a, b) => {
    if (a[property] < b[property]) {
      return -1;
    }

    if (a[property] > b[property]) {
      return 1;
    }

    return 0;
  };
}

export function createDescSorter(property: string): Sorter {
  return (a, b) => {
    if (a[property] < b[property]) {
      return 1;
    }

    if (a[property] > b[property]) {
      return -1;
    }

    return 0;
  };
}

export function multiMatch(
  patterns: MatchPattern[],
  inputString: string
): Record<string, string> | null {
  for (let i = 0; i < patterns.length; i++) {
    const pattern = patterns[i];
    const match = inputString.match(pattern.regex);

    if (!match) continue;

    return pattern.fields.reduce(
      (fields, key, idx) => ({
        ...fields,
        [key]: match[idx + 1],
      }),
      {}
    );
  }

  return null;
}

export function pickRandom<T = unknown>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function unique<T = unknown>(array: T[]): T[] {
  return array.filter((item, i, ar) => ar.indexOf(item) === i);
}
