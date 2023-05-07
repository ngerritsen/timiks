import { handleActions } from "redux-actions";
import * as actionTypes from "../constants/actionTypes";

const initialState = {
  theme: "light",
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
