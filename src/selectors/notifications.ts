import { RootState } from "../store";

export const getMessage = (state: RootState) => state.notifications.message;
export const isError = (state: RootState) => state.notifications.isError;
export const shouldShow = (state: RootState) => state.notifications.show;
