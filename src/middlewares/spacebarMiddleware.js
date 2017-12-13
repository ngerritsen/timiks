import { SPACEBAR_KEYCODE } from '../constants';

import { resetTime, stopTimer, startTimer } from '../actions';

const spacebarMiddleware = store => next => {
  let ignoreKeyUp = false;
  
  window.addEventListener('keydown', (event) => {
    if (isValidSpacebarPress(event) && !event.repeat) {
      if (store.getState().stopped) {
        store.dispatch(resetTime());
        return;
      }

      ignoreKeyUp = true;
      store.dispatch(stopTimer());

      const onKeyUp = (event) => {
        if (isValidSpacebarPress(event)) {
          ignoreKeyUp = false;
          window.removeEventListener(onKeyUp);
        }
      };

      window.addEventListener('keyup', onKeyUp)
    }
  });

  window.addEventListener('keyup', (event) => {
    if (!ignoreKeyUp && store.getState().stopped && isValidSpacebarPress(event)) {
      store.dispatch(startTimer());
    }
  });

  return action => next(action);
}

function isValidSpacebarPress(event) {
  return (
    event.target.tagName.toLowerCase() !== 'button' &&
    event.keyCode === SPACEBAR_KEYCODE
  );
}

export default spacebarMiddleware;
