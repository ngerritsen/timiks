import { handleActions } from 'redux-actions';
import * as actionTypes from '../constants/actionTypes';
import { DEFAULT_PUZZLE, DEFAULT_BUTTON_COLOR } from '../constants/app';
import { DEFAULT_ACTIVATION_DURATION, DEFAULT_ARCHIVE_DAYS } from '../constants/app';

const initialState = {
  puzzle: DEFAULT_PUZZLE,
  archivePuzzle: DEFAULT_PUZZLE,
  archiveDays: DEFAULT_ARCHIVE_DAYS,
  useInspectionTime: false,
  useManualTimeEntry: false,
  theme: 'light',
  buttonColor: DEFAULT_BUTTON_COLOR,
  buttonColorDarkMode: '',
  activationDuration: DEFAULT_ACTIVATION_DURATION,
  showTimerTime: true
};

export default handleActions(
  {
    [actionTypes.LOAD_SETTINGS]: (state, action) => ({
      ...state,
      ...action.payload,
      archiveDays: DEFAULT_ARCHIVE_DAYS
    }),
    [actionTypes.CHANGE_SETTING]: (state, action) => ({
      ...state,
      [action.payload.setting]: action.payload.value
    })
  },
  initialState
);
