import * as actionTypes from '../constants/actionTypes';

const initialState = {
  items: [],
  expanded: '',
  titleInput: '',
  sortBy: 'date',
  puzzle: '',
  importInput: ''
};

function archiveReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_TIMES:
      return {
        ...state,
        items: action.archive
      };
    case actionTypes.CHANGE_IMPORT_INPUT:
      return {
        ...state,
        importInput: action.value
      }
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
    case actionTypes.IMPORT_ARCHIVE:
      return {
        ...state,
        importInput: '',
        items: [
          ...state.items.filter(item => !action.archive.find(i => i.id === item.id)),
          ...action.archive
        ]
      }
    case actionTypes.LOAD_ARCHIVE:
      return {
        ...state,
        items: action.archive
      }
    default:
      return state;
  }
}

export default archiveReducer;
