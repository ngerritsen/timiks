import { connect } from 'react-redux';

import Archive from '../../components/archive/Archive';
import { removeTime, requireTimes } from '../../actions';
import { getArchivePuzzle, getArchiveDays, shouldFixGraphYAxis } from '../../selectors/settings';
import * as archiveSelectors from '../../selectors/times';

function mapStateToProps(state) {
  return {
    times: archiveSelectors.getSortedFilteredArchivedTimes(state),
    timesPerDay: archiveSelectors.getArchivedTimesPerDayForPuzzle(state),
    stats: archiveSelectors.getStatsForArchivedTimesForPuzzle(state),
    fixGraphYAxis: shouldFixGraphYAxis(state),
    puzzle: getArchivePuzzle(state),
    days: getArchiveDays(state)
  };
}

export default connect(mapStateToProps, { removeTime, requireTimes })(Archive);
