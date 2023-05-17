import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

type AuthState = {
  isInitialized: boolean;
  isLoggedIn: boolean;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  user: User | null;
};

const initialState: AuthState = {
  isInitialized: false,
  isLoggedIn: false,
  isLoggingIn: false,
  isLoggingOut: false,
  user: null,
};

const { reducer, actions } = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => ({
      ...state,
      isLoggingIn: true,
    }),
    loginFailed: (state) => ({
      ...state,
      isLoggedIn: false,
      isLoggingIn: false,
    }),
    loginSucceeded: (state, action: PayloadAction<User>) => ({
      ...state,
      isLoggedIn: true,
      isLoggingIn: false,
      isInitialized: true,
      user: action.payload,
    }),
    logout: (state) => ({
      ...state,
      isLoggingOut: true,
    }),
    logoutFailed: (state) => ({
      ...state,
      isLoggingOut: false,
      isLoggedOut: false,
    }),
    logoutSucceeded: () => ({
      ...initialState,
      isInitialized: true,
    }),
  },
});

export default reducer;
export const {
  login,
  loginFailed,
  loginSucceeded,
  logout,
  logoutFailed,
  logoutSucceeded,
} = actions;
