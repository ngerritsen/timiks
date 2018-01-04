import { CHANGE_THEME } from '../constants/actionTypes';
import { changeTheme } from '../actions';
import * as themeRepository from '../repositories/themeRepository';

const themeMiddleware = store => {
  const theme = themeRepository.get();

  if (theme) {
    store.dispatch(changeTheme(theme));
  }

  return next => action => {
    if (action.type === CHANGE_THEME) {
      themeRepository.store(action.theme);
    }

    return next(action);
  }
}

export default themeMiddleware;
