import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TimeTable from '../components/TimeTable';
import { removeTime, showTimeDetails, hideTimeDetails } from '../actions';
import * as times from '../helpers/times';

function mapStateToProps(state) {
  return {
    times: times.markShowDetails(times.markBestTime(state.times.current), state.times.timeDetailsShown),
    average: times.calculateAverageTime(state.times.current),
    averageOfBestThree: times.calculateAverageTimeOfBestThree(state.times.current)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeTime, showTimeDetails, hideTimeDetails }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeTable);
