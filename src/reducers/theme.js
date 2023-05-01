import { handleActions } from "redux-actions";
import * as actionTypes from "../constants/actionTypes";
import { LIGHT } from "../constants/theme";

const initialState = {
  theme: LIGHT,
};

export default handleActions(
  {
    [actionTypes.SET_THEME]: (state, action) => ({
      ...state,
      theme: action.payload,
    }),
  },
  initialState
);
