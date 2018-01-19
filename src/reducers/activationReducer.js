import { PREPARE_ACTIVATION, RESET_ACTIVATION, INCREMENT_PREPARATION_STAGE } from '../constants/actionTypes';

const initialState = {
  preparationStage: -1
}

export default function activationReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_PREPARATION_STAGE:
      return {
        ...state,
        preparationStage: state.preparationStage + 1
      }
    case PREPARE_ACTIVATION:
      return {
        ...state,
        preparationStage: 0
      }
    case RESET_ACTIVATION:
      return {
        ...state,
        preparationStage: -1
      }
    default:
      return state
  }
}
