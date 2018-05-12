import keycode from 'keycode';

import * as actions from '../actions';

const keyboardShortcutMiddleware = store => next => {
  window.addEventListener('keydown', (event) => {
    [...document.querySelectorAll('[data-shortcut]')]
      .forEach(element => {
        const { key, action, args } = JSON.parse(element.getAttribute('data-shortcut'));

        if (keycode(event.keyCode) === key) {
          store.dispatch(actions[action](...args));
        }
      });
  });

  return action => next(action);
};

export default keyboardShortcutMiddleware;
