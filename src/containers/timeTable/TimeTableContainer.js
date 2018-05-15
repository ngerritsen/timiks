import { connect } from 'react-redux';

import TimeTable from '../../components/timeTable/TimeTable';
import { removeTime } from '../../actions';
import * as times from '../../helpers/times';

function mapStateToProps(state, ownProps) {
  const usedTimes = ownProps.times || state.times.current;

  return {
    times: times.markShowDetails(times.markBestTime(usedTimes), state.times.timeDetailsShown),
    stats: times.calculateStats(usedTimes),
    zeroBasedGraph: state.settings.zeroBasedGraph
  };
}

export default connect(mapStateToProps, { removeTime })(TimeTable);
