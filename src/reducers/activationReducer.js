import { PREPARE_ACTIVATION, FIRE_ACTIVATION } from '../constants';

const initialState = {
  preparing: false
}

export default function activationReducer(state = initialState, action) {
  switch (action.type) {
    case PREPARE_ACTIVATION:
      return {
        ...state,
        preparing: true
      }
    case FIRE_ACTIVATION:
      return {
        ...state,
        preparing: false
      }
    default:
      return state
  }
}
