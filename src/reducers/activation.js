import { handleActions } from 'redux-actions';
import * as actionTypes from '../constants/actionTypes';
import { PREPARATION_STAGES } from '../constants/app';

const initialState = {
  preparationStage: -1,
  preparingForInspection: false
};

export default handleActions(
  {
    [actionTypes.PREPARE_INSPECTION]: state => ({
      ...state,
      preparingForInspection: true
    }),
    [actionTypes.START_INSPECTION]: state => ({
      ...state,
      preparingForInspection: false
    }),
    [actionTypes.FAIL_INSPECTION]: () => initialState,
    [actionTypes.INCREMENT_PREPARATION_STAGE]: state => ({
      ...state,
      preparationStage: state.preparationStage + 1
    }),
    [actionTypes.SKIP_PREPARATION_STAGE]: state => ({
      ...state,
      preparationStage: PREPARATION_STAGES
    }),
    [actionTypes.PREPARE_ACTIVATION]: state => ({
      ...state,
      preparationStage: 0
    }),
    [actionTypes.RESET_ACTIVATION]: state => ({
      ...state,
      preparationStage: -1
    })
  },
  initialState
);
