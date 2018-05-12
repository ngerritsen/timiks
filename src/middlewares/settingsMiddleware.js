import * as actionTypes from '../constants/actionTypes';
import { loadSettings } from '../actions';
import * as settingsRepository from '../repositories/settingsRepository';

const STORE_SETTINGS_ON = [
  actionTypes.CHANGE_PUZZLE,
  actionTypes.CHANGE_THEME,
  actionTypes.CHANGE_ACTIVATION_DURATION,
  actionTypes.TOGGLE_INSPECTION_TIME,
  actionTypes.TOGGLE_MANUAL_TIME_ENTRY,
]

const settingsMiddleware = store => {
  const settings = settingsRepository.get();

  store.dispatch(loadSettings(settings));

  return next => action => {
    const result = next(action);

    if (STORE_SETTINGS_ON.includes(action.type)) {
      settingsRepository.store(store.getState().settings)
    }

    return result;
  }
}

export default settingsMiddleware;
