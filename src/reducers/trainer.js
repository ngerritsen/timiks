import { handleActions } from 'redux-actions';
import * as actionTypes from '../constants/actionTypes';

const initialState = {
  currentCaseId: 'o1',
  currentScrambleIndex: 0
};

export default handleActions(
  {
    [actionTypes.NEXT_CASE_DETERMINED]: (state, action) => ({
      ...state,
      currentCaseId: action.payload.id,
      currentScrambleIndex: action.payload.scrambleIndex
    })
  },
  initialState
);
