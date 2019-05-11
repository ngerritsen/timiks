import { connect } from 'react-redux';

import TimeBoardActions from '../../components/timer/TimeBoardActions';
import { clearTimes, archiveTimes } from '../../actions';

export default connect(
  undefined,
  { clearTimes, archiveTimes }
)(TimeBoardActions);
