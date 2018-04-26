import { connect } from 'react-redux';

import TimerOptions from '../components/timer/TimerOptions';
import { changePuzzle, toggleInspectionTime } from '../actions';

function mapStateToProps(state) {
  return {
    puzzle: state.settings.puzzle,
    useInspectionTime: state.settings.useInspectionTime
  };
}

export default connect(
  mapStateToProps,
  { changePuzzle, toggleInspectionTime }
)(TimerOptions);
