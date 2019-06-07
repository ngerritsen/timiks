import { connect } from 'react-redux';

import TimeTable from '../../components/timeTable/TimeTable';
import { removeTime } from '../../actions';
import * as timesSelectors from '../../selectors/times';
import { shouldShowMo3 } from '../../selectors/settings';
import { AVAILABLE_STATS } from '../../constants/app';

function mapStateToProps(state) {
  return {
    times: timesSelectors.getCurrentMarkedSortedTimes(state),
    stats: timesSelectors.getStatsForCurrentTimes(state),
    noDnfTimes: timesSelectors.getCurrentNoDnfTimes(state),
    showGraph: timesSelectors.getCurrentNoDnfTimes(state).length > 1,
    availableStats: AVAILABLE_STATS.filter(({ name }) => shouldShowMo3(state) || name !== 'mo3')
  };
}

export default connect(
  mapStateToProps,
  { removeTime }
)(TimeTable);
