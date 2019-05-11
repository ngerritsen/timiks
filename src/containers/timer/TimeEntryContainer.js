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
    type: 'text',
    value: stateProps.timeInput,
    placeholder: '00:00.000',
    onKeyPress: (e) => {
      if (e.key === 'Enter' && parseTimeInput(stateProps.timeInput)) {
        submitTimeInput();
      }
    },
    onInput: e => updateTimeInput(e.target.value)
  };
}

export default connect(
  mapStateToProps,
  { submitTimeInput, updateTimeInput },
  mergeProps
)(TimeEntry);
