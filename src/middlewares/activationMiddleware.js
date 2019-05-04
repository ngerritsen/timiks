import { PREPARATION_STAGES, INSPECTION_TIME } from '../constants/app';
import * as actions from '../actions';
import { isReady, isPreparing } from '../selectors/activationSelectors';
import { canReset } from '../selectors/timerSelectors';
import listenForActivations from '../activationListener';

const activationMiddleware = store => next => {
  const { dispatch, getState } = store;

  let interval = null;
  let timeout = null;

  listenForActivations({
    onInitiate() {
      const { settings, timer } = getState();
      const { useInspectionTime, activationDuration, useManualTimeEntry } = settings;
      const { inspectionMode } = timer;

      if (useManualTimeEntry) {
        return;
      }

      scrollToTop();

      if (useInspectionTime && !inspectionMode) {
        dispatch(actions.prepareInspection());

        timeout = setTimeout(() => {
          dispatch(actions.failInspection());
        }, INSPECTION_TIME);

        return;
      }

      if (activationDuration === 0) {
        dispatch(actions.skipPreparationStage());
        return;
      }

      dispatch(actions.prepareActivation());

      interval = countDown(() => {
        if (!isReady(getState())) {
          dispatch(actions.incrementPreparationStage())
          return;
        }

        if (canReset(getState())) {
          dispatch(actions.resetTime());
        }
      }, activationDuration);
    },
    onFire() {
      const state = getState();
      const { activation, settings } = state;

      if (settings.useManualTimeEntry) {
        return;
      }

      if (activation.preparingForInspection) {
        dispatch(actions.startInspection(Date.now()));
        return;
      }

      clearInterval(interval);

      if (!isPreparing(state)) {
        return;
      }

      if (isReady(state)) {
        clearTimeout(timeout);
        dispatch(actions.startTimer(Date.now()));
      }

      dispatch(actions.resetActivation());
    },
    onStop() {
      const { timer } = getState();

      if (timer.stopped) {
        return;
      }

      dispatch(actions.stopTimer(Date.now()));
    }
  });

  return action => next(action);
}

function scrollToTop() {
  window.scrollTo(0, 0);
}

function countDown(onIncrement, duration) {
  return setInterval(
    onIncrement,
    duration / PREPARATION_STAGES
  );
}

export default activationMiddleware;
