import { connect } from 'react-redux';

import { isInTimerMode } from '../selectors/timer';
import TimerView from '../components/timer/TimerView';

function mapStateToProps (state) {
  return {
    timerMode: isInTimerMode(state)
  }
}

export default connect(
  mapStateToProps,
)(TimerView);
