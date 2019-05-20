export const isLoggedIn = state => state.authentication.isLoggedIn;
export const isLoggingIn = state => state.authentication.isLoggingIn;
export const isLoggingOut = state => state.authentication.isLoggingOut;
export const getDisplayName = state => state.authentication.displayName;
export const getEmail = state => state.authentication.email;
export const getUserId = state => state.authentication.userId;
export const isInitialized = state => state.authentication.isInitialized;
