import { SET_SCRAMBLE } from '../constants/actionTypes';

export default function scrambleReducer(state = [], action) {
  if (action.type === SET_SCRAMBLE) {
    return action.scramble;
  }

  return state;
}
