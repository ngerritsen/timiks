import * as actionTypes from '../constants/actionTypes';
import { DEFAULT_PUZZLE } from '../constants/app';

const initialState = {
  puzzle: DEFAULT_PUZZLE,
  useInspectionTime: false,
  theme: 'light',
  settingsOpen: false
};

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.OPEN_SETTINGS:
      return {
        ...state,
        settingsOpen: true
      }
    case actionTypes.CLOSE_SETTINGS:
      return {
        ...state,
        settingsOpen: false
      }
    case actionTypes.CHANGE_PUZZLE:
      return {
        ...state,
        puzzle: action.puzzle
      }
    case actionTypes.CHANGE_THEME: {
      return {
        ...state,
        theme: action.theme
      }
    }
    case actionTypes.TOGGLE_INSPECTION_TIME:
      return {
        ...state,
        useInspectionTime: !state.useInspectionTime
      }
    default:
      return state;
  }
}
