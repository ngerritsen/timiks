import { connect } from 'react-redux';

import TimeTable from '../../components/timeTable/TimeTable';
import { removeTime } from '../../actions';
import * as timesSelectors from '../../selectors/times';
import { shouldFixGraphYAxis, shouldShowLatestSolveOnTop } from '../../selectors/settings';

function mapStateToProps(state) {
  return {
    times: timesSelectors.getCurrentMarkedSortedTimes(state),
    stats: timesSelectors.getStatsForCurrentTimes(state),
    showGraph: timesSelectors.getCurrentNoDnfTimes(state).length > 1,
    showLatestSolveOnTop: shouldShowLatestSolveOnTop(state),
    fixGraphYAxis: shouldFixGraphYAxis(state)
  };
}

export default connect(mapStateToProps, { removeTime })(TimeTable);
