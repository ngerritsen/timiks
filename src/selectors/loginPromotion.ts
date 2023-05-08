import { RootState } from "../store";

export const shouldPromoteLogin = (state: RootState) =>
  state.loginPromotion.shouldPromoteLogin;
