import { RESET_TIME, START_TIMER, STOP_TIMER } from '../constants/actionTypes';

const initialState = {
  startTime: 0,
  stopped: true,
  finalTime: 0
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
        finalTime: action.finalTime,
        stopped: true
      }
    case RESET_TIME:
      return {
        ...state,
        finalTime: 0,
        startTime: 0
      }
    default:
      return state
  }
}
