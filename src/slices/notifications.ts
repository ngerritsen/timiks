import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type NotificationsState = {
  message: string;
  isError: boolean;
  show: boolean;
};

const initialState: NotificationsState = {
  message: "",
  isError: false,
  show: false,
};

const { reducer, actions } = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    showNotification: (
      state,
      action: PayloadAction<{ message: string; isError?: boolean }>
    ) => {
      state.message = action.payload.message;
      state.isError = Boolean(action.payload.isError);
      state.show = true;
    },
    hideNotification: (state) => {
      state.show = false;
    },
  },
});

export default reducer;
export const { showNotification, hideNotification } = actions;
