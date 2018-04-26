import * as actionTypes from '../constants/actionTypes';

const initialState = {
  current: [],
  timeDetailsShown: ''
};

export default function timesReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SAVE_TIME: {
      const { id, ms, date, scramble, puzzle, dnf } = action;

      return {
        ...state,
        current: [...state.current, { id, ms, date, scramble, puzzle, dnf }]
      };
    }
    case actionTypes.REMOVE_TIME:
      return {
        ...state,
        current: state.current.filter(time => time.id !== action.id)
      };
    case actionTypes.CLEAR_TIMES:
      return {
        ...state,
        current: []
      };
    case actionTypes.LOAD_TIMES:
      return {
        ...state,
        current: action.current
      };
    case actionTypes.SHOW_TIME_DETAILS:
      return {
        ...state,
        timeDetailsShown: action.id
      }
    case actionTypes.HIDE_TIME_DETAILS:
      return {
        ...state,
        timeDetailsShown: ''
      }
    default:
      return state;
  }
}
