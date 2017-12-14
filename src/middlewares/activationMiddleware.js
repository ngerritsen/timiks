import { SPACEBAR_KEYCODE, PREPARE_ACTIVATION, FIRE_ACTIVATION } from '../constants';

import { resetTime, stopTimer, startTimer, prepareActivation, fireActivation } from '../actions';

const activationMiddleware = store => next => {
  const { dispatch, getState } = store;

  onSpacebarPress(() => {
    if (getState().timer.stopped) {
      dispatch(resetTime());
      dispatch(prepareActivation());
      return;
    }

    dispatch(stopTimer());
  });

  onSpacebarRelease(() => {
    const { timer, activation } = getState();

    if (timer.stopped && activation.preparing) {
      dispatch(startTimer());
      dispatch(fireActivation());
    }
  });

  return action => next(action);
}

function onSpacebarPress(callback) {
  window.addEventListener('keydown', (event) => {
    if (isActivationSpacebarEvent(event)) {
      event.preventDefault();
      callback();
    }
  });
}

function onSpacebarRelease(callback) {
  window.addEventListener('keyup', (event) => {
    if (isActivationSpacebarEvent(event)) {
      event.preventDefault();
      callback();
    }
  });
}

function isActivationSpacebarEvent(event) {
  return (
    event.keyCode === SPACEBAR_KEYCODE &&
    !event.repeat
  );
}

export default activationMiddleware;
