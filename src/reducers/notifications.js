import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from '../constants/actionTypes';

const initialState = {
  message: '',
  isError: false,
  show: false
};

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        message: action.payload.message,
        isError: Boolean(action.payload.isError),
        show: true
      };
    case HIDE_NOTIFICATION:
      return {
        ...state,
        show: false
      };
    default:
      return state;
  }
}
