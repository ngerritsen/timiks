import * as actionTypes from '../constants/actionTypes';

const initialState = {
  times: [],
  applyLocalChanges: true
};

export default function timesReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCEEDED:
      return { ...state, applyLocalChanges: false };
    case actionTypes.LOGOUT_SUCCEEDED:
      return { ...state, applyLocalChanges: true };
    default:
      break;
  }

  if (!state.applyLocalChanges) {
    switch (action.type) {
      case actionTypes.LOAD_TIMES:
        return { ...state, times: action.times.map(markTimeAsStored) };
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
          time.id !== action.id ? time : updateTime(time, action.fields)
        )
      };
    case actionTypes.ARCHIVE_TIMES:
      return {
        ...state,
        times: state.times.map(time => (time.current ? archiveTime(time) : time))
      };
    case actionTypes.CLEAR_TIMES:
      return { ...state, times: state.times.filter(time => !time.current) };
    case actionTypes.LOAD_LOCAL_TIMES:
      return { ...state, times: action.times };
    default:
      return state;
  }
}

function archiveTime(time) {
  return { ...time, current: false, dirty: true };
}

function updateTime(time, fields) {
  return { ...time, ...fields, dirty: true };
}

function markTimeAsStored(time) {
  return { ...time, stored: true, dirty: false };
}
