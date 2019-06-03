import { connect } from 'react-redux';

import { startTimer, stopTimer, resetTime, submitTimeInput } from '../../actions';
import Activation from '../../components/timer/Activation';
import * as activationSelectors from '../../selectors/activation';
import * as timerSelectors from '../../selectors/timer';
import * as settingsSelectors from '../../selectors/settings';
import { parseTimeInput } from '../../helpers/time';

function mapStateToProps(state) {
  return {
    time: timerSelectors.getTime(state),
    stopped: timerSelectors.isStopped(state),
    preparationStage: activationSelectors.getPreparationStage(state),
    useManualTimeEntry: settingsSelectors.shouldUseManualTimeEntry(state),
    showHelpText: settingsSelectors.shouldShowHelpText(state),
    preparing: activationSelectors.isPreparing(state),
    preparingForInspection: activationSelectors.isPreparingForInspection(state),
    inspecting: timerSelectors.isInspecting(state),
    validTimeInput: timerSelectors.isValidTimeInput(state),
    timeInput: timerSelectors.getTimeInput(state),
    useInspectionTime: settingsSelectors.shouldUseInspectionTime(state),
    ready: activationSelectors.isReady(state)
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    submitTimeInput: () => {
      const inputData = parseTimeInput(stateProps.timeInput);

      dispatchProps.submitTimeInput(inputData.ms, inputData.dnf, inputData.plus2);
    }
  };
}

export default connect(
  mapStateToProps,
  { startTimer, stopTimer, resetTime, submitTimeInput },
  mergeProps
)(Activation);
