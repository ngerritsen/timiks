import { CLOSE_MODAL, OPEN_MODAL } from '../constants/actionTypes';

const initialState = {
  current: ''
}

function modalReducer(state = initialState, action) {
  switch(action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        current: action.id
      }
    case CLOSE_MODAL:
      return {
        ...state,
        current: ''
      }
    default:
      return state;
  }
}

export default modalReducer;
