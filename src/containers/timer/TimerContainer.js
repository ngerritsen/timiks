import { connect } from 'react-redux';

import { submitTimeInput, updateTimeInput } from '../../actions';
import { getLastTime } from '../../selectors/times';
import Timer from '../../components/timer/Timer';
import { shouldUseManualTimeEntry } from '../../selectors/settings';
import { isPreparing, isPreparingForInspection, isReady } from '../../selectors/activation';
import * as timerSelectors from '../../selectors/timer';

function mapStateToProps(state) {
  const startTime = timerSelectors.getStartTime(state);
  const ready = isReady(state);
  const useManualTimeEntry = shouldUseManualTimeEntry(state);
  const lastTime = getLastTime(state);
  const showLastTime = startTime === 0 && !ready && !useManualTimeEntry && Boolean(lastTime);

  return {
    inspecting: timerSelectors.isInInspecting(state),
    inspectionStartTime: timerSelectors.getInspectionStartTime(state),
    lastTime,
    preparing: isPreparing(state),
    preparingForInspection: isPreparingForInspection(state),
    ready,
    showLastTime,
    startTime,
    stopped: timerSelectors.isStopped(state),
    useManualTimeEntry
  };
}

export default connect(
  mapStateToProps,
  { submitTimeInput, updateTimeInput }
)(Timer);
