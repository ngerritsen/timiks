import { handleActions } from "redux-actions";
import * as actionTypes from "../constants/actionTypes";

const initialState = {
  startTime: 0,
  stopTime: 0,
  inspectionStartTime: 0,
  stopped: true,
  timeInput: "",
  inspecting: false,
  lastTimeId: "",
  isTraining: false,
};

export default handleActions(
  {
    [actionTypes.START_TIMER]: (state, action) => ({
      ...state,
      startTime: action.payload,
      stopped: false,
      stopTime: 0,
      inspecting: false,
    }),
    [actionTypes.FAIL_INSPECTION]: () => initialState,
    [actionTypes.START_INSPECTION]: (state, action) => ({
      ...state,
      inspectionStartTime: action.payload,
      inspecting: true,
    }),
    [actionTypes.SAVE_TIME]: (state, action) => ({
      ...state,
      startTime: 0,
      inspectionStartTime: 0,
      lastTimeId: action.payload.id,
    }),
    [actionTypes.STOP_TIMER]: (state, action) => ({
      ...state,
      stopped: true,
      stopTime: action.payload,
    }),
    [actionTypes.RESET_TIME]: (state) => ({
      ...state,
      startTime: 0,
      stopTime: 0,
    }),
    [actionTypes.SUBMIT_TIME_INPUT]: (state) => ({
      ...state,
      timeInput: "",
    }),
    [actionTypes.UPDATE_TIME_INPUT]: (state, action) => ({
      ...state,
      timeInput: action.payload,
    }),
    [actionTypes.SET_IS_TRAINING]: (state, action) => ({
      ...state,
      isTraining: action.payload,
    }),
  },
  initialState
);
