import * as actionTypes from '../constants/actionTypes';

const initialState = {
  shouldPromoteLogin: false
};

export default function loginPromotionReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.PROMOTE_LOGIN:
      return {
        ...state,
        shouldPromoteLogin: true
      };
    case actionTypes.DISMISS_LOGIN_PROMOTION:
      return {
        ...state,
        shouldPromoteLogin: false
      };
    default:
      return state;
  }
}
