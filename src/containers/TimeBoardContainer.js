import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TimeBoard from '../components/TimeBoard';
import { removeTime } from '../actions';
import { calculateAverageTime, markBestTime } from '../helpers';

function mapStateToProps(state) {
  return {
    times: markBestTime(state.times),
    average: calculateAverageTime(state.times)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeTime }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeBoard);
