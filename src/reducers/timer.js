import * as actionTypes from '../constants/actionTypes';

const initialState = {
  startTime: 0,
  stopped: true,
  inspectionStartTime: 0,
  timeInput: '',
  inspecting: false,
  lastTimeId: ''
};

export default function timerReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.START_TIMER:
      return {
        ...state,
        startTime: action.startTime,
        stopped: false,
        inspecting: false,
        inspectionStartTime: 0
      };
    case actionTypes.FAIL_INSPECTION:
      return {
        ...initialState
      };
    case actionTypes.START_INSPECTION:
      return {
        ...state,
        inspectionStartTime: action.startTime,
        inspecting: true
      };
    case actionTypes.SAVE_TIME:
      return {
        ...state,
        startTime: 0,
        lastTimeId: action.id
      };
    case actionTypes.STOP_TIMER:
      return {
        ...state,
        stopped: true
      };
    case actionTypes.RESET_TIME:
      return {
        ...state,
        startTime: 0
      };
    case actionTypes.SUBMIT_TIME_INPUT:
      return {
        ...state,
        timeInput: ''
      };
    case actionTypes.UPDATE_TIME_INPUT:
      return {
        ...state,
        timeInput: action.timeInput
      };
    default:
      return state;
  }
}
