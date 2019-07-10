import { handleActions } from 'redux-actions';
import * as actionTypes from '../constants/actionTypes';

const initialState = {
  enabledCases: [],
  currentCaseId: 1,
  currentScrambleIndex: 0
};

export default handleActions(
  {
    [actionTypes.LOAD_ENABLED_CASES]: (state, action) => ({
      ...state,
      enabledCases: action.payload
    }),
    [actionTypes.NEXT_CASE_DETERMINED]: (state, action) => ({
      ...state,
      currentCaseId: action.payload.id,
      currentScrambleIndex: action.payload.scrambleIndex
    }),
    [actionTypes.SELECT_CASE]: (state, action) => ({
      ...state,
      enabledCases: [...state.enabledCases, action.payload]
    }),
    [actionTypes.DESELECT_CASE]: (state, action) => ({
      ...state,
      enabledCases: state.enabledCases.filter(id => id !== action.payload)
    })
  },
  initialState
);
