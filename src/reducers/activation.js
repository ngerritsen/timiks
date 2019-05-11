import * as actionTypes from '../constants/actionTypes';
import { PREPARATION_STAGES } from '../constants/app';

const initialState = {
  preparationStage: -1,
  preparingForInspection: false
}

export default function activationReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.PREPARE_INSPECTION:
      return {
        ...state,
        preparingForInspection: true
      }
    case actionTypes.START_INSPECTION:
      return {
        ...state,
        preparingForInspection: false
      }
    case actionTypes.FAIL_INSPECTION:
      return initialState
    case actionTypes.INCREMENT_PREPARATION_STAGE:
      return {
        ...state,
        preparationStage: state.preparationStage + 1
      }
    case actionTypes.SKIP_PREPARATION_STAGE:
      return {
        ...state,
        preparationStage: PREPARATION_STAGES
      }
    case actionTypes.PREPARE_ACTIVATION:
      return {
        ...state,
        preparationStage: 0
      }
    case actionTypes.RESET_ACTIVATION:
      return {
        ...state,
        preparationStage: -1
      }
    default:
      return state
  }
}
