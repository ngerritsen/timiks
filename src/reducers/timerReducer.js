import { RESET_TIME, START_TIMER, STOP_TIMER } from '../constants/actionTypes';

const initialState = {
  startTime: 0,
  stopped: true
}

export default function timerReducer(state = initialState, action) {
  switch (action.type) {
    case START_TIMER:
      return {
        ...state,
        startTime: action.startTime,
        stopped: false
      }
    case STOP_TIMER:
      return {
        ...state,
        stopped: true
      }
    case RESET_TIME:
      return {
        ...state,
        startTime: 0
      }
    default:
      return state
  }
}
