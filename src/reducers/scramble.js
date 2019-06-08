import { SET_SCRAMBLE } from '../constants/actionTypes';
import { DEFAULT_PUZZLE } from '../constants/app';

const initialState = {
  scramble: [],
  puzzle: DEFAULT_PUZZLE
};

export default function scrambleReducer(state = initialState, action) {
  if (action.type === SET_SCRAMBLE) {
    return {
      ...state,
      scramble: action.payload.scramble,
      puzzle: action.payload.puzzle
    };
  }

  return state;
}
