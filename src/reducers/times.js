import * as actionTypes from '../constants/actionTypes';

const initialState = [];

export default function timesReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SAVE_TIME:
      return [...state, action.time];
    case actionTypes.REMOVE_TIME:
      return state.filter(time => time.id !== action.id);
    case actionTypes.UPDATE_TIME:
      return state.map(time => (time.id !== action.id ? time : updateTime(time, action.fields)));
    case actionTypes.ARCHIVE_TIMES:
      return state.map(time => (time.current ? archiveTime(time) : time));
    case actionTypes.ARCHIVE_TIMES_SUCCEEDED:
      return state.map(time => (action.ids.includes(time.id) ? markTimeAsStored(time) : time));
    case actionTypes.CLEAR_TIMES:
      return state.filter(time => !time.current);
    case actionTypes.LOAD_TIMES:
      return mergeTimes(state, action.times, true);
    case actionTypes.LOAD_LOCAL_TIMES:
      return mergeTimes(state, action.times, false);
    case actionTypes.SAVE_TIME_SUCCEEDED:
      return state.map(time => (time.id === action.id ? markTimeAsStored(time) : time));
    case actionTypes.UPDATE_TIME_SUCCEEDED:
      return state.map(time => (time.id === action.id ? markTimeAsStored(time) : time));
    case actionTypes.SAVE_TIMES_SUCCEEDED:
      return state.map(time => (action.ids.includes(time.id) ? markTimeAsStored(time) : time));
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

function mergeTimes(currentTimes, newTimes, markAsStored) {
  const newIds = newTimes.map(time => time.id);
  const timesToKeep = currentTimes.filter(time => !newIds.includes(time.id));
  return [...timesToKeep, ...newTimes.map(time => ({ ...time, stored: markAsStored }))];
}
