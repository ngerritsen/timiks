import { connect } from 'react-redux';

import { startTimer, stopTimer, resetTime } from '../actions';
import Activation from '../components/Activation';
import { isReady, isPreparing } from '../selectors/activationSelectors';

function mapStateToProps (state) {
  const { timer, activation } = state;
  const { stopped, time } = timer;
  const { preparationStage } = activation;

  return {
    time,
    stopped,
    preparationStage,
    preparing: isPreparing(state),
    ready: isReady(state)
  }
}

export default connect(
  mapStateToProps,
  { startTimer, stopTimer, resetTime }
)(Activation);
