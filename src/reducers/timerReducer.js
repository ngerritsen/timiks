import * as actionTypes from '../constants/actionTypes';

const initialState = {
  startTime: 0,
  stopped: true,
  finalTime: 0,
  scrambleDetailsOpen: false
}

export default function timerReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.START_TIMER:
      return {
        ...state,
        startTime: action.startTime,
        stopped: false
      }
    case actionTypes.STOP_TIMER:
      return {
        ...state,
        finalTime: action.finalTime,
        stopped: true
      }
    case actionTypes.RESET_TIME:
      return {
        ...state,
        finalTime: 0,
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
