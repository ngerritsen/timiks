import { PREPARATION_STAGES, ACTIVATION_DURATION } from '../constants/app';
import * as actions from '../actions';
import { isReady, isPreparing } from '../selectors/activationSelectors';
import listenForActivations from '../activationListener';

const activationMiddleware = store => next => {
  const { dispatch, getState } = store;

  let interval = null;

  listenForActivations({
    onInitiate() {
      dispatch(actions.resetTime());
      dispatch(actions.prepareActivation());

      interval = countDown(() => {
        if (!isReady(getState())) {
          dispatch(actions.incrementPreparationStage())
        }
      });
    },
    onFire() {
      clearInterval(interval);

      if (!isPreparing(getState())) {
        return;
      }

      if (isReady(getState())) {
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

function countDown(onIncrement) {
  return setInterval(
    onIncrement,
    ACTIVATION_DURATION / PREPARATION_STAGES
  );
}

export default activationMiddleware;
