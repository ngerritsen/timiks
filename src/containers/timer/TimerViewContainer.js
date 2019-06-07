import { connect } from 'react-redux';

import TimerView from '../../components/timer/TimerView';
import { getTimes } from '../../actions';

export default connect(
  undefined,
  { getTimes }
)(TimerView);
