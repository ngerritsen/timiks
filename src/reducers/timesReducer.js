import { SAVE_TIME } from '../constants';

export default function timesReducer(state = [], action) {
  if (action.type === SAVE_TIME) {
    const { ms, date, scamble } = action;

    return [...state, { ms, date, scamble }];
  }

  return state;
}
