import { handleActions } from 'redux-actions';
import * as actionTypes from '../constants/actionTypes';
import { unique } from '../helpers/general';
import { types, cases } from '../constants/trainer';

const initialState = {
  enabledCases: types.reduce((enabledCases, type) => ({ ...enabledCases, [type]: [] }), {}),
  trainingType: types[0],
  currentCaseId: Object.keys(cases[types[0]])[0],
  currentScrambleIndex: 0
};

export default handleActions(
  {
    [actionTypes.CHANGE_TRAINING_TYPE]: (state, action) => ({
      ...state,
      trainingType: action.payload
    }),
    [actionTypes.LOAD_ENABLED_CASES]: (state, action) => ({
      ...state,
      enabledCases: { ...state.enabledCases, ...action.payload }
    }),
    [actionTypes.NEXT_CASE_DETERMINED]: (state, action) => ({
      ...state,
      currentCaseId: action.payload.id,
      currentScrambleIndex: action.payload.scrambleIndex
    }),
    [actionTypes.SELECT_CASE]: (state, action) => ({
      ...state,
      enabledCases: {
        ...state.enabledCases,
        [state.trainingType]: [...state.enabledCases[state.trainingType], action.payload]
      }
    }),
    [actionTypes.DESELECT_CASE]: (state, action) => ({
      ...state,
      enabledCases: {
        ...state.enabledCases,
        [state.trainingType]: state.enabledCases[state.trainingType].filter(
          id => id !== action.payload
        )
      }
    }),
    [actionTypes.SELECT_CASES]: (state, action) => ({
      ...state,
      enabledCases: {
        ...state.enabledCases,
        [state.trainingType]: unique([...state.enabledCases[state.trainingType], ...action.payload])
      }
    }),
    [actionTypes.DESELECT_CASES]: (state, action) => ({
      ...state,
      enabledCases: {
        ...state.enabledCases,
        [state.trainingType]: state.enabledCases[state.trainingType].filter(
          id => !action.payload.includes(id)
        )
      }
    })
  },
  initialState
);
