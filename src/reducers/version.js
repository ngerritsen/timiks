import { handleActions } from "redux-actions";
import * as actionTypes from "../constants/actionTypes";

const initialState = {
  shouldPromptNewVersion: false,
};

export default handleActions(
  {
    [actionTypes.NEW_VERSION_AVAILABLE]: () => ({
      shouldPromptNewVersion: true,
    }),
    [actionTypes.DISMISS_NEW_VERSION]: () => ({
      shouldPromptNewVersion: false,
    }),
  },
  initialState
);
