import { connect } from 'react-redux';

import TimeBoardActions from '../../components/timer/TimeBoardActions';
import * as actions from '../../actions';

export default connect(
  undefined,
  {
    clearTimes: actions.clearTimes,
    archiveTimes: actions.archiveTimes
  }
)(TimeBoardActions);
