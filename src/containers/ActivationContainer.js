import { connect } from 'react-redux';

import { startTimer, stopTimer, resetTime } from '../actions';
import Activation from '../components/Activation';
import { isReady, isPreparing } from '../selectors/activationSelectors';

function mapStateToProps (state) {
  const { timer, activation, settings } = state;
  const { stopped, time, inspectionMode } = timer;
  const { preparationStage, preparingForInspection } = activation;

  return {
    time,
    stopped,
    preparationStage,
    preparing: isPreparing(state),
    preparingForInspection: preparingForInspection,
    inspectionMode,
    useInspectionTime: settings.useInspectionTime,
    ready: isReady(state)
  }
}

export default connect(
  mapStateToProps,
  { startTimer, stopTimer, resetTime }
)(Activation);
