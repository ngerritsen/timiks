import * as actionTypes from '../constants/actionTypes';
import { DEFAULT_PUZZLE } from '../constants/app';
import { DEFAULT_ACTIVATION_DURATION } from '../constants/app';

const initialState = {
  puzzle: DEFAULT_PUZZLE,
  archivePuzzle: DEFAULT_PUZZLE,
  useInspectionTime: false,
  useManualTimeEntry: false,
  theme: 'light',
  activationDuration: DEFAULT_ACTIVATION_DURATION,
  showTimerTime: true
};

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_SETTINGS:
      return {
        ...state,
        ...action.payload
      };
    case actionTypes.CHANGE_SETTING:
      return {
        ...state,
        [action.payload.setting]: action.payload.value
      };
    default:
      return state;
  }
}
