import { handleActions } from 'redux-actions';
import * as actionTypes from '../constants/actionTypes';

const initialState = {
  startTime: 0,
  stopped: true,
  inspectionStartTime: 0,
  timeInput: '',
  inspecting: false,
  lastTimeId: ''
};

export default handleActions(
  {
    [actionTypes.START_TIMER]: (state, action) => ({
      ...state,
      startTime: action.payload,
      stopped: false,
      inspecting: false,
      inspectionStartTime: 0
    }),
    [actionTypes.FAIL_INSPECTION]: () => initialState,
    [actionTypes.START_INSPECTION]: (state, action) => ({
      ...state,
      inspectionStartTime: action.payload,
      inspecting: true
    }),
    [actionTypes.SAVE_TIME]: (state, action) => ({
      ...state,
      startTime: 0,
      lastTimeId: action.payload.id
    }),
    [actionTypes.STOP_TIMER]: state => ({
      ...state,
      stopped: true
    }),
    [actionTypes.RESET_TIME]: state => ({
      ...state,
      startTime: 0
    }),
    [actionTypes.SUBMIT_TIME_INPUT]: state => ({
      ...state,
      timeInput: ''
    }),
    [actionTypes.UPDATE_TIME_INPUT]: (state, action) => ({
      ...state,
      timeInput: action.timeInput
    })
  },
  initialState
);
