import { START_TIMER, TIMER_INTERVAL, STOP_TIMER, SPACEBAR_KEYCODE } from './constants';
import { incrementTime, resetTime, stopTimer, startTimer } from './actions';

const timerMiddleware = store => next => {
  let timer = null;

  const tick = () => store.dispatch(incrementTime(TIMER_INTERVAL));

  listenForSpaceBar(store);

  return action => {
    switch (action.type) {
      case START_TIMER:
        store.dispatch(resetTime());
        timer = setInterval(tick, TIMER_INTERVAL);
        break;
      case STOP_TIMER:
        clearInterval(timer);
        break;
    }

    return next(action);
  }
}

function listenForSpaceBar(store) {
  window.addEventListener('keydown', (event) => {
    const isButton = event.target.tagName.toLowerCase() === 'button';
    const isSpacebar = event.keyCode === SPACEBAR_KEYCODE;

    if (isSpacebar && !isButton && !event.repeat) {
      if (store.getState().stopped) {
        store.dispatch(startTimer());
        return;
      }

      store.dispatch(stopTimer());
    }
  });
}

export default timerMiddleware;
