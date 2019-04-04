import * as actionTypes from '../constants/actionTypes';

const initialState = {
  current: [],
  archived: []
};

export default function timesReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SAVE_TIME: {
      const { id, ms, date, scramble, puzzle, dnf, plus2 } = action;

      return {
        ...state,
        current: [...state.current, { id, ms, date, scramble, puzzle, dnf, plus2 }]
      };
    }
    case actionTypes.REMOVE_TIME:
      return {
        ...state,
        current: state.current.filter(time => time.id !== action.id)
      };
    case actionTypes.UPDATE_TIME:
      return {
        ...state,
        current: state.current.map((time) => {
          if (time.id !== action.id) {
            return time;
          }

          return {
            ...time,
            ...action.fields
          }
        })
      }
    case actionTypes.ARCHIVE_TIMES:
      return {
        ...state,
        current: [],
        archived: [...state.current, ...state.archived]
      }
    case actionTypes.CLEAR_TIMES:
      return {
        ...state,
        current: []
      };
    case actionTypes.LOAD_TIMES:
      return {
        ...state,
        current: action.current,
        archived: action.archived
      };
    default:
      return state;
  }
}
