import { handleActions } from 'redux-actions';
import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from '../constants/actionTypes';

const initialState = {
  message: '',
  isError: false,
  show: false
};

export default handleActions(
  {
    [SHOW_NOTIFICATION]: (state, action) => ({
      ...state,
      message: action.payload.message,
      isError: Boolean(action.payload.isError),
      show: true
    }),
    [HIDE_NOTIFICATION]: state => ({
      ...state,
      show: false
    })
  },
  initialState
);
