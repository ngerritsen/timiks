import { createSlice } from "@reduxjs/toolkit";

type VersionState = {
  shouldPromptNewVersion: boolean;
};

const initialState: VersionState = {
  shouldPromptNewVersion: false,
};

const { reducer, actions } = createSlice({
  name: "version",
  initialState,
  reducers: {
    newVersionAvailable: () => ({
      shouldPromptNewVersion: true,
    }),
    dismissNewVersion: () => ({
      shouldPromptNewVersion: false,
    }),
  },
});

export default reducer;
export const { newVersionAvailable, dismissNewVersion } = actions;
