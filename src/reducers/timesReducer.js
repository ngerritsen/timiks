import { SAVE_TIME, REMOVE_TIME } from '../constants';

export default function timesReducer(state = [], action) {
  switch (action.type) {
    case SAVE_TIME: {
      const { id, ms, date, scamble } = action;

      return [...state, { id, ms, date, scamble }];
    }
    case REMOVE_TIME:
      return state.filter(time => time.id !== action.id);
    default:
      return state;
  }
}
