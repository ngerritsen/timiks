import * as actionTypes from '../constants/actionTypes';

const initialState = {
  shouldPromptNewVersion: false
};

export default function versionReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.NEW_VERSION_AVAILABLE:
      return {
        ...state,
        shouldPromptNewVersion: true
      };
    case actionTypes.DISMISS_NEW_VERSION:
      return {
        ...state,
        shouldPromptNewVersion: false
      };
    default:
      return state;
  }
}
