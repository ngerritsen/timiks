import { SPACEBAR_KEYCODE } from '../constants/app';
import { resetTime, stopTimer, startTimer, prepareActivation, fireActivation } from '../actions';

const activationMiddleware = store => next => {
  const { dispatch, getState } = store;

  onSpacebarPress(store, () => {
    if (getState().timer.stopped) {
      dispatch(resetTime());
      dispatch(prepareActivation());
      return;
    }

    dispatch(stopTimer());
  });

  onSpacebarRelease(store, () => {
    const { timer, activation } = getState();

    if (timer.stopped && activation.preparing) {
      dispatch(startTimer());
      dispatch(fireActivation());
    }
  });

  return action => next(action);
}

function onSpacebarPress(store, callback) {
  window.addEventListener('keydown', (event) => {
    if (isActivationSpacebarEvent(store, event)) {
      event.preventDefault();
      callback();
    }
  });
}

function onSpacebarRelease(store, callback) {
  window.addEventListener('keyup', (event) => {
    if (isActivationSpacebarEvent(store, event)) {
      event.preventDefault();
      callback();
    }
  });
}

function isActivationSpacebarEvent(store, event) {
  return (
    !store.getState().times.isModalOpen &&
    event.keyCode === SPACEBAR_KEYCODE &&
    !event.repeat
  );
}

export default activationMiddleware;
