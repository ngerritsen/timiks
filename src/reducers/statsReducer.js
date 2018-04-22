import { SHOW_STATS_INFO, HIDE_STATS_INFO } from '../constants/actionTypes';

const initialState = {
  statsInfoOpen: false
};

export default function statsReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_STATS_INFO:
      return {
        ...state,
        statsInfoOpen: true
      }
    case HIDE_STATS_INFO: {
      return {
        ...state,
        statsInfoOpen: false
      }
    }
    default:
      return state;
  }
}
