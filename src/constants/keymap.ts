import { KeyMapping } from "../types";

const keymap: KeyMapping[] = [
  {
    key: ",",
    commands: ["openSettings"],
    description: "Open the settings",
  },
  {
    key: "a",
    commands: ["archiveTimes"],
    description: "Archive the current times",
  },
  {
    key: "c",
    commands: ["clearTimes"],
    description: "Clear the current times",
  },
  {
    key: "d",
    commands: ["dnfLastTime"],
    description: "Toggle DNF for the last time",
  },
  {
    key: "backspace",
    commands: ["removeLastTime"],
    description: "Remove the last time",
  },
  {
    key: "esc",
    commands: ["closeModal"],
    description: "Close any modal",
  },
  {
    key: "i",
    commands: ["toggleInspectionTime"],
    description: "Toggle inspection time",
  },
  {
    key: "k",
    commands: ["showKeyboardShortcuts"],
    description: "Show keyboard shortcuts",
  },
  {
    key: "m",
    commands: ["toggleManualTimeEntry"],
    description: "Toggle manual time entry",
  },
  {
    key: "n",
    commands: ["toggleDarkMode"],
    description: "Toggle dark mode",
  },
  {
    key: "p",
    commands: ["plus2LastTime"],
    description: "Toggle +2 penalty for the last time",
  },
  {
    key: "r",
    commands: ["refreshScramble", "retryCase", "reQueueCase"],
    description: "Refresh scramble or retry/re-queue training case",
  },
  {
    key: "s",
    commands: ["showScramble"],
    description: "Show scramble details (only for cubes)",
  },
  {
    key: "space",
    commands: [],
    description: "Start/stop the timer",
  },
  {
    key: "t",
    commands: ["commentOnTime"],
    description: "Comment on the last time",
  },
  {
    key: "right",
    commands: ["next"],
    hide: true,
  },
  {
    key: "left",
    commands: ["previous"],
    hide: true,
  },
];

export default keymap;
