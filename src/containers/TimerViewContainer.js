import { connect } from 'react-redux';

import { isInTimerMode } from '../selectors/timer';
import TimerView from '../components/TimerView';

function mapStateToProps (state) {
  return {
    timerMode: isInTimerMode(state)
  }
}

export default connect(
  mapStateToProps,
)(TimerView);
