import { connect } from 'react-redux';

import { startTimer, stopTimer, resetTime, submitTimeInput } from '../../actions';
import Activation from '../../components/timer/Activation';
import { isReady, isPreparing, isPreparingForInspection, getPreparationStage } from '../../selectors/activation';
import { getTime, isInInspectionMode, isStopped, isValidTimeInput } from '../../selectors/timer';
import { shouldUseManualTimeEntry, shouldUseInspectionTime } from '../../selectors/settings';

function mapStateToProps (state) {
  return {
    time: getTime(state),
    stopped: isStopped(state),
    preparationStage: getPreparationStage(state),
    useManualTimeEntry: shouldUseManualTimeEntry(state),
    preparing: isPreparing(state),
    preparingForInspection: isPreparingForInspection(state),
    inspectionMode: isInInspectionMode(state),
    validTimeInput: isValidTimeInput(state),
    useInspectionTime: shouldUseInspectionTime(state),
    ready: isReady(state)
  }
}

export default connect(
  mapStateToProps,
  { startTimer, stopTimer, resetTime, submitTimeInput }
)(Activation);
