import { connect } from 'react-redux';

import { submitTimeInput, updateTimeInput } from '../../actions';
import { getLastTime } from '../../selectors/times';
import Timer from '../../components/timer/Timer';
import { shouldUseManualTimeEntry, shouldShowTimerTime } from '../../selectors/settings';
import { isPreparing, isPreparingForInspection, isReady } from '../../selectors/activation';
import * as timerSelectors from '../../selectors/timer';
import { getTrainingType, getActiveEnabledCases } from '../../selectors/trainer';
import { isInTrainer } from '../../selectors/router';

function mapStateToProps(state) {
  const startTime = timerSelectors.getStartTime(state);
  const stopTime = timerSelectors.getStopTime(state);
  const ready = isReady(state);
  const useManualTimeEntry = shouldUseManualTimeEntry(state);
  const lastTime = getLastTime(state);
  const showLastTime = startTime === 0 && !ready && !useManualTimeEntry && Boolean(lastTime);
  const trainingType = getTrainingType(state);
  const isTraining = isInTrainer(state);
  const enabledCases = getActiveEnabledCases(state).length;

  return {
    inspecting: timerSelectors.isInspecting(state),
    inspectionStartTime: timerSelectors.getInspectionStartTime(state),
    lastTime,
    preparing: isPreparing(state),
    preparingForInspection: isPreparingForInspection(state),
    ready,
    showLastTime,
    startTime,
    stopTime,
    finalTime: stopTime - startTime,
    stopped: timerSelectors.isStopped(state),
    useManualTimeEntry,
    showTimerTime: shouldShowTimerTime(state),
    isTraining,
    trainingType,
    enabledCases
  };
}

export default connect(
  mapStateToProps,
  { submitTimeInput, updateTimeInput }
)(Timer);
