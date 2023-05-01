import { handleActions } from "redux-actions";
import { NETWORK_ONLINE, NETWORK_OFFLINE } from "../constants/actionTypes";
import { isOnline } from "../helpers/network";

const initialState = {
  isOnline: isOnline(),
};

export default handleActions(
  {
    [NETWORK_ONLINE]: (state) => ({
      ...state,
      isOnline: true,
    }),
    [NETWORK_OFFLINE]: (state) => ({
      ...state,
      isOnline: false,
    }),
  },
  initialState
);
