import * as actionTypes from '../constants/actionTypes';

const initialState = {
  times: [],
  useLocalTimes: true,
  requiredTimes: {
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
    case actionTypes.REQUIRE_TIMES:
      return {
        ...state,
        requiredTimes: {
          puzzle: action.payload.puzzle || null,
          current: Boolean(action.payload.current)
        }
      };
    default:
      break;
  }

  if (!state.useLocalTimes) {
    switch (action.type) {
      case actionTypes.LOAD_TIMES:
        return {
          ...state,
          times: [
            ...state.times.filter(time =>
              action.payload.current
                ? !time.current
                : time.current || time.puzzle !== action.payload.puzzle
            ),
            ...action.payload.times.map(time => ({ ...time, stored: true }))
          ]
        };
      default:
        return state;
    }
  }

  switch (action.type) {
    case actionTypes.SAVE_TIME:
      return { ...state, times: [...state.times, action.payload] };
    case actionTypes.REMOVE_TIME:
      return { ...state, times: state.times.filter(time => time.id !== action.payload) };
    case actionTypes.UPDATE_TIME:
      return {
        ...state,
        times: state.times.map(time =>
          time.id !== action.payload.id ? time : { ...time, ...action.payload.fields }
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
      return { ...state, times: action.payload };
    default:
      return state;
  }
}
