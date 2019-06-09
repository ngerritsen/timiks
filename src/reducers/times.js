import { handleActions } from 'redux-actions';
import * as actionTypes from '../constants/actionTypes';

const initialState = {
  times: [],
  useLocalTimes: true,
  requiredTimes: {
    current: true,
    puzzle: null
  }
};

const standardTimesReducer = handleActions(
  {
    [actionTypes.LOGIN_SUCCEEDED]: state => ({ ...state, useLocalTimes: false }),
    [actionTypes.LOGOUT_SUCCEEDED]: state => ({ ...state, useLocalTimes: true }),
    [actionTypes.REQUIRE_TIMES]: (state, action) => ({
      ...state,
      requiredTimes: {
        puzzle: action.payload.puzzle || null,
        current: Boolean(action.payload.current)
      }
    })
  },
  initialState
);

const cloudTimesReducer = handleActions(
  {
    [actionTypes.LOAD_TIMES]: (state, action) => ({
      ...state,
      times: [
        ...state.times.filter(time =>
          action.payload.current
            ? !time.current
            : time.current || time.puzzle !== action.payload.puzzle
        ),
        ...action.payload.times.map(time => ({ ...time, stored: true }))
      ]
    })
  },
  initialState
);

const localTimesReducer = handleActions(
  {
    [actionTypes.SAVE_TIME]: (state, action) => ({
      ...state,
      times: [...state.times, action.payload]
    }),
    [actionTypes.REMOVE_TIME]: (state, action) => ({
      ...state,
      times: state.times.filter(time => time.id !== action.payload)
    }),
    [actionTypes.UPDATE_TIME]: (state, action) => ({
      ...state,
      times: state.times.map(time =>
        time.id !== action.payload.id ? time : { ...time, ...action.payload.fields }
      )
    }),
    [actionTypes.ARCHIVE_TIMES]: state => ({
      ...state,
      times: state.times.map(time => (time.current ? { ...time, current: false } : time))
    }),
    [actionTypes.CLEAR_TIMES]: state => ({
      ...state,
      times: state.times.filter(time => !time.current)
    }),
    [actionTypes.LOAD_LOCAL_TIMES]: (state, action) => ({ ...state, times: action.payload })
  },
  initialState
);

export default function timesReducer(state = initialState, action) {
  state = standardTimesReducer(state, action);

  if (!state.useLocalTimes) {
    return cloudTimesReducer(state, action);
  }

  return localTimesReducer(state, action);
}
