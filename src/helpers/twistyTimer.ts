import { parseTimeInput, isValidTime } from "./time";
import { parseCsv } from "./csv";
import { randomId } from "./id";

export default function parseTwistyTimerExport(csv: string) {
  return parseCsv(csv, ";", ["time", "scramble", "date", "penalty"])
    .map((item) => {
      try {
        const time = {
          id: randomId(),
          ...parseTwistyTimerTime(item.time, item.penalty),
          scramble: parseTwistyTimerScramble(item.scramble),
          date: new Date(item.date),
        };

        return isValidTime(time) && time;
      } catch (e) {
        return null;
      }
    })
    .filter(Boolean);
}

function parseTwistyTimerTime(string: string, penalty: string) {
  return {
    ...parseTimeInput(string),
    dnf: penalty === "DNF",
  };
}

function parseTwistyTimerScramble(string: string) {
  return string.trim().replace(/[\n\s]+/g, " ");
}
