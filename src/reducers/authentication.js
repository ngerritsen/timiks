import * as actionTypes from '../constants/actionTypes';

const initialState = {
  isInitialized: false,
  isLoggedIn: false,
  isLoggingIn: false,
  isLoggingOut: false,
  displayName: '',
  email: '',
  userId: ''
};

export default function activationReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        isLoggingIn: true
      };
    case actionTypes.LOGIN_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        isLoggingIn: false
      };
    case actionTypes.LOGIN_SUCCEEDED:
      return {
        ...state,
        isLoggedIn: true,
        isLoggingIn: false,
        isInitialized: true,
        displayName: action.displayName,
        email: action.email,
        userId: action.userId
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLoggingOut: true
      };
    case actionTypes.LOGOUT_FAILED:
      return {
        ...state,
        isLoggingOut: false,
        isLoggedOut: false
      };
    case actionTypes.LOGOUT_SUCCEEDED:
      return {
        ...state,
        isLoggingOut: false,
        isLoggedIn: false,
        isInitialized: true,
        displayName: '',
        email: '',
        userId: ''
      };
    default:
      return state;
  }
}
