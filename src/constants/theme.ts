import { SelectOption, ThemeOption } from "../types";

export const THEME_OPTIONS: SelectOption<ThemeOption>[] = [
  { label: "Auto", value: "auto" },
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
];

export const DEFAULT_THEME: ThemeOption = "auto";
