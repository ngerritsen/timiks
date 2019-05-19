import * as actionTypes from '../constants/actionTypes';

const initialState = [];

export default function timesReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SAVE_TIME:
      return [...state, action.time];
    case actionTypes.REMOVE_TIME:
      return state.filter(time => time.id !== action.id);
    case actionTypes.UPDATE_TIME:
      return state.map(time =>
        time.id !== action.id ? time : { ...time, ...action.fields, dirty: true }
      );
    case actionTypes.ARCHIVE_TIMES:
      return state.map(time => (time.current ? { ...time, current: false, dirty: true } : time));
    case actionTypes.ARCHIVED_TIMES:
      return state.map(time =>
        action.ids.includes(time.id)
          ? { ...time, current: false, stored: true, dirty: false }
          : time
      );
    case actionTypes.CLEAR_TIMES:
      return state.filter(time => !time.current);
    case actionTypes.LOAD_TIMES:
      return mergeTimes(state, action.times, true);
    case actionTypes.LOAD_LOCAL_TIMES:
      return mergeTimes(state, action.times, false);
    case actionTypes.STORED_TIME:
      return state.map(time =>
        time.id === action.id ? { ...time, stored: true, dirty: false } : time
      );
    case actionTypes.STORED_TIMES:
      return state.map(time =>
        action.ids.includes(time.id) ? { ...time, stored: true, dirty: false } : time
      );
    default:
      return state;
  }
}

function mergeTimes(currentTimes, newTimes, markAsStored) {
  const newIds = newTimes.map(time => time.id);
  const timesToKeep = currentTimes.filter(time => !newIds.includes(time.id));
  return [...timesToKeep, ...newTimes.map(time => ({ ...time, stored: markAsStored }))];
}
