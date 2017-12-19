import * as constants from '../constants';

const initialState = {
  current: [],
  archive: [],
  isModalOpen: false,
  titleInput: ''
};

export default function timesReducer(state = initialState, action) {
  switch (action.type) {
    case constants.SAVE_TIME: {
      const { id, ms, date, scramble } = action;

      return {
        ...state,
        current: [...state.current, { id, ms, date, scramble }]
      };
    }
    case constants.REMOVE_TIME:
      return {
        ...state,
        current: state.current.filter(time => time.id !== action.id)
      };
    case constants.CLEAR_TIMES:
      return {
        ...state,
        current: []
      };
    case constants.LOAD_TIMES:
      return {
        ...state,
        current: action.current,
        archive: action.archive
      };
    case constants.OPEN_SAVE_TIMES_MODAL:
      return {
        ...state,
        isModalOpen: true
      }
    case constants.CLOSE_SAVE_TIMES_MODAL:
      return {
        ...state,
        isModalOpen: false,
        titleInput: ''
      }
    case constants.SAVE_TIMES:
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
    case constants.INPUT_TIMES_TITLE:
      return {
        ...state,
        titleInput: action.title
      }
    default:
      return state;
  }
}
