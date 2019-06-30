import { handleActions } from 'redux-actions';
import { SET_SCRAMBLE } from '../constants/actionTypes';
import { DEFAULT_PUZZLE } from '../constants/settings';

const initialState = {
  scramble: [],
  puzzle: DEFAULT_PUZZLE
};

export default handleActions(
  {
    [SET_SCRAMBLE]: (_, action) => ({
      scramble: action.payload.scramble,
      puzzle: action.payload.puzzle
    })
  },
  initialState
);
