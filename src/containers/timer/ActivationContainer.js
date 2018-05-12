import { connect } from 'react-redux';

import { startTimer, stopTimer, resetTime, submitTimeInput } from '../../actions';
import { parseTimeInput } from '../../helpers/time';
import Activation from '../../components/timer/Activation';
import { isReady, isPreparing } from '../../selectors/activationSelectors';

function mapStateToProps (state) {
  const { timer, activation, settings } = state;
  const { stopped, time, inspectionMode, timeInput } = timer;
  const { preparationStage, preparingForInspection } = activation;
  const { useInspectionTime, useManualTimeEntry } = settings;

  return {
    time,
    stopped,
    preparationStage,
    useManualTimeEntry,
    preparing: isPreparing(state),
    preparingForInspection,
    inspectionMode,
    validTimeInput: Boolean(parseTimeInput(timeInput)),
    useInspectionTime,
    ready: isReady(state)
  }
}

export default connect(
  mapStateToProps,
  { startTimer, stopTimer, resetTime, submitTimeInput }
)(Activation);
