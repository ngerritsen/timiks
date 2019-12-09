import { connect } from 'react-redux';

import { submitTimeInput, updateTimeInput } from '../../actions';
import { getLastTime } from '../../selectors/times';
import Timer from '../../components/timer/Timer';
import { shouldUseManualTimeEntry, shouldShowTimerTime } from '../../selectors/settings';
import { isPreparing, isPreparingForInspection, isReady } from '../../selectors/activation';
import * as timerSelectors from '../../selectors/timer';
import * as settingsSelectors from '../../selectors/settings';
import { isInTrainer } from '../../selectors/router';

function mapStateToProps(state) {
  const startTime = timerSelectors.getStartTime(state);
  const stopTime = timerSelectors.getStopTime(state);
  const currentPuzzle = settingsSelectors.getPuzzleInfo(state).title;
  const ready = isReady(state);
  const useManualTimeEntry = shouldUseManualTimeEntry(state);
  const inspecting = timerSelectors.isInspecting(state);
  const useInspectionTime = settingsSelectors.shouldUseInspectionTime(state);

  const lastTime = getLastTime(state);
  const showLastTime =
    startTime === 0 && !ready && !useManualTimeEntry && !inspecting && Boolean(lastTime);
  const isTraining = isInTrainer(state);

  return {
    inspecting: timerSelectors.isInspecting(state),
    inspectionStartTime: timerSelectors.getInspectionStartTime(state),
    lastTime,
    currentPuzzle,
    preparing: isPreparing(state),
    preparingForInspection: isPreparingForInspection(state),
    ready,
    showLastTime,
    startTime,
    stopTime,
    finalTime: stopTime - startTime,
    stopped: timerSelectors.isStopped(state),
    useManualTimeEntry,
    useInspectionTime,
    showTimerTime: shouldShowTimerTime(state),
    isTraining
  };
}

export default connect(mapStateToProps, { submitTimeInput, updateTimeInput })(Timer);
