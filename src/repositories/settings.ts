import { SettingsState } from "../slices/settings";
import { SETTINGS_STORAGE_KEY } from "../constants/storage";
import { Partial } from "react-spring";

export function store(settings: SettingsState) {
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
}

export function get(): Partial<SettingsState> {
  const rawSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);

  try {
    return JSON.parse(rawSettings);
  } catch (e) {
    return {};
  }
}
