import * as actionTypes from '../constants/actionTypes';
import { DEFAULT_PUZZLE } from '../constants/app';
import { DEFAULT_ACTIVATION_DURATION } from '../constants/app';

const initialState = {
  puzzle: DEFAULT_PUZZLE,
  useInspectionTime: false,
  theme: 'light',
  activationDuration: DEFAULT_ACTIVATION_DURATION
};

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_PUZZLE:
      return {
        ...state,
        puzzle: action.puzzle
      }
    case actionTypes.CHANGE_THEME: {
      return {
        ...state,
        theme: action.theme
      }
    }
    case actionTypes.TOGGLE_INSPECTION_TIME:
      return {
        ...state,
        useInspectionTime: !state.useInspectionTime
      }
    case actionTypes.CHANGE_ACTIVATION_DURATION:
      return {
        ...state,
        activationDuration: action.activationDuration
      }
    default:
      return state;
  }
}
