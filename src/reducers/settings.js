import * as actionTypes from '../constants/actionTypes';
import { DEFAULT_PUZZLE } from '../constants/app';
import { DEFAULT_ACTIVATION_DURATION } from '../constants/app';

const initialState = {
  puzzle: DEFAULT_PUZZLE,
  useInspectionTime: false,
  useManualTimeEntry: false,
  theme: 'light',
  activationDuration: DEFAULT_ACTIVATION_DURATION,
  showHelpText: true,
  showMo3: true,
  showTimerTime: true
};

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_SETTINGS:
      return {
        ...state,
        ...action.settings
      };
    case actionTypes.CHANGE_PUZZLE:
      return {
        ...state,
        puzzle: action.puzzle
      };
    case actionTypes.CHANGE_THEME: {
      return {
        ...state,
        theme: action.theme
      };
    }
    case actionTypes.TOGGLE_SHOW_HELP_TEXT:
      return {
        ...state,
        showHelpText: !state.showHelpText
      };
    case actionTypes.TOGGLE_SHOW_MO3:
      return {
        ...state,
        showMo3: !state.showMo3
      };
    case actionTypes.TOGGLE_SHOW_TIMER_TIME:
      return {
        ...state,
        showTimerTime: !state.showTimerTime
      };
    case actionTypes.TOGGLE_MANUAL_TIME_ENTRY:
      return {
        ...state,
        useManualTimeEntry: !state.useManualTimeEntry
      };
    case actionTypes.TOGGLE_INSPECTION_TIME:
      return {
        ...state,
        useInspectionTime: !state.useInspectionTime
      };
    case actionTypes.CHANGE_ACTIVATION_DURATION:
      return {
        ...state,
        activationDuration: action.activationDuration
      };
    default:
      return state;
  }
}
