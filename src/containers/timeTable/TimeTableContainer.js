import { connect } from 'react-redux';

import TimeTable from '../../components/timeTable/TimeTable';
import { removeTime } from '../../actions';
import * as timesSelectors from '../../selectors/times';

function mapStateToProps(state) {
  return {
    times: timesSelectors.getCurrentMarkedSortedTimes(state),
    stats: timesSelectors.getStatsForCurrentTimes(state),
    noDnfTimes: timesSelectors.getCurrentNoDnfTimes(state),
    showGraph: timesSelectors.getCurrentNoDnfTimes(state).length > 1
  };
}

export default connect(
  mapStateToProps,
  { removeTime }
)(TimeTable);
