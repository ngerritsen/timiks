import { connect } from 'react-redux';

import Archive from '../../components/archive/Archive';
import { changeSetting, removeTime, requireTimes } from '../../actions';
import { getArchivePuzzle } from '../../selectors/settings';
import * as archiveSelectors from '../../selectors/times';

function mapStateToProps(state) {
  return {
    times: archiveSelectors.getSortedArchivedTimesForPuzzle(state),
    timesPerDay: archiveSelectors.getArchivedTimesPerDayForPuzzle(state),
    stats: archiveSelectors.getStatsForArchivedTimesForPuzzle(state),
    puzzle: getArchivePuzzle(state)
  };
}

export default connect(
  mapStateToProps,
  { changeSetting, removeTime, requireTimes }
)(Archive);
