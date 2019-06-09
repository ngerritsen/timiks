import { handleActions } from 'redux-actions';
import * as actionTypes from '../constants/actionTypes';

const initialState = {
  shouldPromoteLogin: false
};

export default handleActions(
  {
    [actionTypes.PROMOTE_LOGIN]: () => ({ shouldPromoteLogin: true }),
    [actionTypes.DISMISS_LOGIN_PROMOTION]: () => ({ shouldPromoteLogin: false })
  },
  initialState
);
