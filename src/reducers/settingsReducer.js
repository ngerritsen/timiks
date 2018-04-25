import { CHANGE_PUZZLE, CHANGE_THEME, TOGGLE_INSPECTION_TIME } from '../constants/actionTypes';
import { DEFAULT_PUZZLE } from '../constants/app';

const initialState = {
  puzzle: DEFAULT_PUZZLE,
  useInspectionTime: false,
  theme: 'light'
};

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_PUZZLE:
      return {
        ...state,
        puzzle: action.puzzle
      }
    case CHANGE_THEME: {
      return {
        ...state,
        theme: action.theme
      }
    }
    case TOGGLE_INSPECTION_TIME:
      return {
        ...state,
        useInspectionTime: !state.useInspectionTime
      }
    default:
      return state;
  }
}
