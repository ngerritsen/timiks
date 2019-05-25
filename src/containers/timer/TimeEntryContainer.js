import { connect } from 'react-redux';

import { submitTimeInput, updateTimeInput } from '../../actions';
import { parseTimeInput } from '../../helpers/time';
import TimeEntry from '../../components/timer/TimeEntry';
import { getTimeInput } from '../../selectors/timer';

function mapStateToProps(state) {
  return {
    timeInput: getTimeInput(state)
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { updateTimeInput, submitTimeInput } = dispatchProps;

  return {
    ...ownProps,
    value: stateProps.timeInput,
    onKeyPress: e => {
      const inputData = parseTimeInput(stateProps.timeInput);

      if (e.key === 'Enter' && inputData) {
        submitTimeInput(inputData.ms, inputData.dnf, inputData.plus2);
      }
    },
    onChange: e => updateTimeInput(e.target.value)
  };
}

export default connect(
  mapStateToProps,
  { submitTimeInput, updateTimeInput },
  mergeProps
)(TimeEntry);
