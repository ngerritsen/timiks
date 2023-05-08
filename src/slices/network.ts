import { createSlice } from "@reduxjs/toolkit";
import { isOnline } from "../helpers/network";

type NetworkState = {
  isOnline: boolean;
};

const initialState: NetworkState = {
  isOnline: isOnline(),
};

const { reducer, actions } = createSlice({
  name: "network",
  initialState,
  reducers: {
    goOnline(state) {
      state.isOnline = true;
    },
    goOffline(state) {
      state.isOnline = false;
    },
  },
});

export default reducer;
export const { goOnline, goOffline } = actions;
