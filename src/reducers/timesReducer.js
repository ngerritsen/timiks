import * as constants from '../constants';

const initialState = {
  times: [],
  groups: [],
  isModalOpen: false,
  titleInput: ''
};

export default function timesReducer(state = initialState, action) {
  switch (action.type) {
    case constants.SAVE_TIME: {
      const { id, ms, date, scramble } = action;

      return {
        ...state,
        times: [...state.times, { id, ms, date, scramble }]
      };
    }
    case constants.REMOVE_TIME:
      return {
        ...state,
        times: state.times.filter(time => time.id !== action.id)
      };
    case constants.CLEAR_TIMES:
      return {
        ...state,
        times: []
      };
    case constants.LOAD_TIMES:
      return {
        ...state,
        times: action.times
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
        times: [],
        isModalOpen: false,
        titleInput: '',
        groups: [
          ...state.groups,
          {
            title: action.title,
            times: state.times
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
