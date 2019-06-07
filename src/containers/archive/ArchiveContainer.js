import { connect } from 'react-redux';

import Archive from '../../components/archive/Archive';
import { changePuzzle, removeTime, getTimes } from '../../actions';
import { getPuzzle } from '../../selectors/settings';
import * as archiveSelectors from '../../selectors/times';

function mapStateToProps(state) {
  return {
    times: archiveSelectors.getSortedArchivedTimesForPuzzle(state),
    timesPerDay: archiveSelectors.getArchivedTimesPerDayForPuzzle(state),
    stats: archiveSelectors.getStatsForArchivedTimesForPuzzle(state),
    puzzle: getPuzzle(state)
  };
}

export default connect(
  mapStateToProps,
  { changePuzzle, removeTime, getTimes }
)(Archive);
