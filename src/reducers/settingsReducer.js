import { CHANGE_PUZZLE, CHANGE_THEME } from '../constants/actionTypes';
import { DEFAULT_PUZZLE } from '../constants/app';

const initialState = {
  puzzle: DEFAULT_PUZZLE,
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
    default:
      return state;
  }
}
