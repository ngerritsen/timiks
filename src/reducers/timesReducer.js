import * as actionTypes from '../constants/actionTypes';

const initialState = {
  current: [],
  archive: [],
  isModalOpen: false,
  titleInput: ''
};

export default function timesReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SAVE_TIME: {
      const { id, ms, date, scramble } = action;

      return {
        ...state,
        current: [...state.current, { id, ms, date, scramble }]
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
        current: action.current,
        archive: action.archive
      };
    case actionTypes.OPEN_SAVE_TIMES_MODAL:
      return {
        ...state,
        isModalOpen: true
      }
    case actionTypes.CLOSE_SAVE_TIMES_MODAL:
      return {
        ...state,
        isModalOpen: false,
        titleInput: ''
      }
    case actionTypes.SAVE_TIMES:
      return {
        ...state,
        current: [],
        isModalOpen: false,
        titleInput: '',
        archive: [
          ...state.archive,
          {
            title: action.title,
            times: state.current
          }
        ]
      };
    case actionTypes.INPUT_TIMES_TITLE:
      return {
        ...state,
        titleInput: action.title
      }
    default:
      return state;
  }
}
