import { PREPARATION_STAGES, INSPECTION_TIME } from '../constants/app';
import * as actions from '../actions';
import { isReady, isPreparing } from '../selectors/activationSelectors';
import listenForActivations from '../activationListener';

const activationMiddleware = store => next => {
  const { dispatch, getState } = store;

  let interval = null;
  let timeout = null;

  listenForActivations({
    onInitiate() {
      const { useInspectionTime, activationDuration } = getState().settings;
      const { inspectionMode } = getState().timer;

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

        dispatch(actions.resetTime());
      }, activationDuration);
    },
    onFire() {
      if (getState().activation.preparingForInspection) {
        dispatch(actions.startInspection());
        return;
      }

      clearInterval(interval);

      if (!isPreparing(getState())) {
        return;
      }

      if (isReady(getState())) {
        clearTimeout(timeout);
        dispatch(actions.startTimer());
      }

      dispatch(actions.resetActivation());
    },
    onStop() {
      if (getState().timer.stopped) {
        return;
      }

      dispatch(actions.stopTimer());
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
