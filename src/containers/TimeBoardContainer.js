import { connect } from 'react-redux';

import TimeBoard from '../components/TimeBoard';
import { calculateAverageTime, markBestTime } from '../helpers';

function mapStateToProps(state) {
  return {
    times: markBestTime(state.times),
    average: calculateAverageTime(state.times)
  };
}

export default connect(mapStateToProps)(TimeBoard);
