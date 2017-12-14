import { INCREMENT_TIME, RESET_TIME, START_TIMER, STOP_TIMER } from '../constants';

const initialState = {
  time: 0,
  stopped: true,
  times: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_TIMER:
      return {
        ...state,
        stopped: false
      }
    case STOP_TIMER:
      return {
        ...state,
        stopped: true,
        times: [
          ...state.times, {
            time: state.time
          }
        ]
      }
    case INCREMENT_TIME:
      return {
        ...state,
        time: state.time += action.ms
      }
    case RESET_TIME:
      return {
        ...state,
        time: 0
      }
    default:
      return state
  }
}
