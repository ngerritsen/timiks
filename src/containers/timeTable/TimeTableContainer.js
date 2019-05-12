import { connect } from 'react-redux';

import TimeTable from '../../components/timeTable/TimeTable';
import { removeTime } from '../../actions';
import { getCurrentMarkedTimes, getStatsForCurrentTimes } from '../../selectors/times';

function mapStateToProps(state) {
  return {
    times: getCurrentMarkedTimes(state),
    stats: getStatsForCurrentTimes(state)
  };
}

export default connect(
  mapStateToProps,
  { removeTime }
)(TimeTable);
