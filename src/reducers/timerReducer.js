import * as actionTypes from '../constants/actionTypes';

const initialState = {
  startTime: 0,
  stopped: true,
  inspectionStartTime: 0,
  inspectionMode: false,
  lastTimeId: '',
  scrambleDetailsOpen: false
}

export default function timerReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.START_TIMER:
      return {
        ...state,
        startTime: action.startTime,
        stopped: false,
        inspectionMode: false,
        inspectionStartTime: 0
      }
    case actionTypes.FAIL_INSPECTION:
      return {
        ...initialState
      }
    case actionTypes.START_INSPECTION:
      return {
        ...state,
        inspectionStartTime: action.startTime,
        inspectionMode: true
      }
    case actionTypes.STOP_TIMER:
      return {
        ...state,
        lastTimeId: action.lastTimeId,
        stopped: true
      }
    case actionTypes.RESET_TIME:
      return {
        ...state,
        startTime: 0
      }
    case actionTypes.SHOW_SCRAMBLE_DETAILS:
      return {
        ...state,
        scrambleDetailsOpen: true
      }
    case actionTypes.HIDE_SCRAMBLE_DETAILS:
      return {
        ...state,
        scrambleDetailsOpen: false
      }
      default:
      return state
  }
}
