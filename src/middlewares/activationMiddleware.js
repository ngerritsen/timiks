import { PREPARATION_STAGES, ACTIVATION_DURATION, INSPECTION_TIME } from '../constants/app';
import * as actions from '../actions';
import { isReady, isPreparing } from '../selectors/activationSelectors';
import listenForActivations from '../activationListener';

const activationMiddleware = store => next => {
  const { dispatch, getState } = store;

  let interval = null;
  let timeout = null;

  listenForActivations({
    onInitiate() {
      const { useInspectionTime } = getState().settings;
      const { inspectionMode } = getState().timer;

      scrollToTop();

      if (useInspectionTime && !inspectionMode) {
        dispatch(actions.prepareInspection());

        timeout = setTimeout(() => {
          dispatch(actions.failInspection());
        }, INSPECTION_TIME);

        return;
      }

      dispatch(actions.prepareActivation());

      interval = countDown(() => {
        if (!isReady(getState())) {
          dispatch(actions.incrementPreparationStage())
          return;
        }

        dispatch(actions.resetTime());
      });
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

function countDown(onIncrement) {
  return setInterval(
    onIncrement,
    ACTIVATION_DURATION / PREPARATION_STAGES
  );
}

export default activationMiddleware;
