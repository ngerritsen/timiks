import * as actionTypes from '../constants/actionTypes';

const initialState = {
  times: [],
  useLocalTimes: true,
  subscribeTo: {
    current: true,
    puzzle: null
  }
};

export default function timesReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCEEDED:
      return { ...state, useLocalTimes: false };
    case actionTypes.LOGOUT_SUCCEEDED:
      return { ...state, useLocalTimes: true };
    case actionTypes.GET_TIMES:
      return {
        ...state,
        subscribeTo: {
          puzzle: action.puzzle || null,
          current: Boolean(action.current)
        }
      };
    default:
      break;
  }

  if (!state.useLocalTimes) {
    switch (action.type) {
      case actionTypes.LOAD_TIMES:
        return { ...state, times: action.times.map(time => ({ ...time, stored: true })) };
      default:
        return state;
    }
  }

  switch (action.type) {
    case actionTypes.SAVE_TIME:
      return { ...state, times: [...state.times, action.time] };
    case actionTypes.REMOVE_TIME:
      return { ...state, times: state.times.filter(time => time.id !== action.id) };
    case actionTypes.UPDATE_TIME:
      return {
        ...state,
        times: state.times.map(time =>
          time.id !== action.id ? time : { ...time, ...action.fields }
        )
      };
    case actionTypes.ARCHIVE_TIMES:
      return {
        ...state,
        times: state.times.map(time => (time.current ? { ...time, current: false } : time))
      };
    case actionTypes.CLEAR_TIMES:
      return { ...state, times: state.times.filter(time => !time.current) };
    case actionTypes.LOAD_LOCAL_TIMES:
      return { ...state, times: action.times };
    default:
      return state;
  }
}
