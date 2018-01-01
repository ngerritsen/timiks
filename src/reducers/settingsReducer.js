import { CHANGE_PUZZLE } from '../constants/actionTypes';
import { DEFAULT_PUZZLE } from '../constants/app';

const initialState = {
  isOpen: false,
  puzzle: DEFAULT_PUZZLE
};

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_PUZZLE:
      return {
        ...state,
        puzzle: action.puzzle
      }
    default:
      return state;
  }
}
