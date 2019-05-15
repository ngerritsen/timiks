import * as actionTypes from '../constants/actionTypes';
import { loadSettings } from '../actions';
import * as settingsRepository from '../repositories/settings';
import { getSettings } from '../selectors/settings';

const STORE_SETTINGS_ON = [
  actionTypes.CHANGE_PUZZLE,
  actionTypes.CHANGE_THEME,
  actionTypes.CHANGE_ACTIVATION_DURATION,
  actionTypes.TOGGLE_INSPECTION_TIME,
  actionTypes.TOGGLE_MANUAL_TIME_ENTRY
];

const settings = store => {
  const settings = settingsRepository.get();

  store.dispatch(loadSettings(settings));

  return next => action => {
    const result = next(action);

    if (STORE_SETTINGS_ON.includes(action.type)) {
      settingsRepository.store(getSettings(store.getState()));
    }

    return result;
  };
};

export default settings;
