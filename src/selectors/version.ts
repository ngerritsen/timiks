import type { RootState } from "../store";

export const shouldPromptNewVersion = (state: RootState) =>
  state.version.shouldPromptNewVersion;
