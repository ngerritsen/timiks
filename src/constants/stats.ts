import { StatConfig } from "../types";

export const TRIM_PERCENTAGE = 5;

export default [
  {
    name: "single",
    type: "SINGLE",
    showInGraph: true,
    color: "blue",
  },
  {
    name: "mo3",
    type: "MEAN",
    size: 3,
    color: "turquoise",
  },
  {
    name: "ao5",
    type: "AVERAGE",
    size: 5,
    showInGraph: true,
    color: "green",
  },
  {
    name: "ao12",
    type: "AVERAGE",
    size: 12,
    showInGraph: true,
    color: "yellow",
  },
  {
    name: "ao25",
    type: "AVERAGE",
    size: 25,
    showInGraph: true,
    color: "orange",
  },
  {
    name: "ao50",
    type: "AVERAGE",
    size: 50,
    showInGraph: true,
    color: "red",
  },
  {
    name: "ao100",
    type: "AVERAGE",
    size: 100,
    showInGraph: true,
    color: "purple",
  },
  {
    name: "ao200",
    type: "AVERAGE",
    size: 200,
    showInGraph: true,
    color: "deepBlue",
  },
  {
    name: "ao500",
    type: "AVERAGE",
    size: 500,
    showInGraph: true,
    color: "brown",
  },
  {
    name: "ao1000",
    type: "AVERAGE",
    size: 1000,
    showInGraph: true,
    color: "dark",
  },
  {
    name: "mean",
    type: "MEAN",
    color: "grey",
  },
  {
    name: "σ",
    type: "STANDARD_DEVIATION",
    color: "pink",
  },
] as StatConfig[];
