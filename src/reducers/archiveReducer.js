import * as actionTypes from '../constants/actionTypes';

const initialState = {
  items: [],
  expanded: '',
  isModalOpen: false,
  titleInput: '',
  sortBy: 'date',
  puzzle: ''
};

function archiveReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_TIMES:
      return {
        ...state,
        items: action.archive
      };
    case actionTypes.ARCHIVE:
      return {
        ...state,
        titleInput: '',
        isModalOpen: false,
        items: [
          ...state.items,
          {
            id: action.id,
            title: state.titleInput,
            puzzle: action.puzzle,
            times: action.times
          }
        ]
      }
    case actionTypes.REMOVE_ARCHIVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id)
      }
    case actionTypes.EXPAND_ARCHIVE_ITEM:
      return {
        ...state,
        expanded: action.id
      }
    case actionTypes.COLLAPSE_ARCHIVE_ITEM:
      return {
        ...state,
        expanded: ''
      }
    case actionTypes.OPEN_ARCHIVE_MODAL:
      return {
        ...state,
        isModalOpen: true
      }
    case actionTypes.CLOSE_ARCHIVE_MODAL:
      return {
        ...state,
        isModalOpen: false,
        titleInput: ''
      }
    case actionTypes.ARCHIVE_CURRENT_TIMES:
      return {
        ...state,
        isModalOpen: false,
        titleInput: ''
      };
    case actionTypes.INPUT_ARCHIVE_TITLE:
      return {
        ...state,
        titleInput: action.title
      }
    case actionTypes.SORT_ARCHIVE:
      return {
        ...state,
        sortBy: action.sortBy
      }
    case actionTypes.FILTER_ARCHIVE:
      return {
        ...state,
        puzzle: action.puzzle
      }
    default:
      return state;
  }
}

export default archiveReducer;
