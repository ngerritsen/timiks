import { RootState } from "../store";

export const getAuthState = (state: RootState) => state.auth;

export const getUserId = (state: RootState) => state.auth.user.uid;

export const getIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
