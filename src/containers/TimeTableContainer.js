import { connect } from 'react-redux';

import TimeTable from '../components/TimeTable';
import { removeTime, showTimeDetails, hideTimeDetails, showStatsInfo, hideStatsInfo } from '../actions';
import * as times from '../helpers/times';

function mapStateToProps(state, ownProps) {
  const usedTimes = ownProps.times || state.times.current;

  return {
    times: times.markShowDetails(times.markBestTime(usedTimes), state.times.timeDetailsShown),
    stats: times.calculateStats(usedTimes),
    statsInfoOpen: state.stats.statsInfoOpen
  };
}

export default connect(
  mapStateToProps,
  { removeTime, showTimeDetails, hideTimeDetails, showStatsInfo, hideStatsInfo }
)(TimeTable);
