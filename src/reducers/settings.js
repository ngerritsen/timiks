import { handleActions } from 'redux-actions';
import * as actionTypes from '../constants/actionTypes';
import * as settingsConstants from '../constants/settings';
import { DEFAULT_ACTIVATION_DURATION, DEFAULT_ARCHIVE_DAYS } from '../constants/settings';

const initialState = {
  puzzle: settingsConstants.DEFAULT_PUZZLE,
  archivePuzzle: settingsConstants.DEFAULT_PUZZLE,
  archiveDays: DEFAULT_ARCHIVE_DAYS,
  useInspectionTime: false,
  useManualTimeEntry: false,
  warnForInspectionTime: true,
  theme: 'light',
  buttonColor: settingsConstants.DEFAULT_BUTTON_COLOR,
  buttonColorDarkMode: '',
  activationDuration: DEFAULT_ACTIVATION_DURATION,
  showTimerTime: true,
  fixGraphYAxis: false,
  disabledArchiveGraphLines: []
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
