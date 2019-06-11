import { connect } from 'react-redux';

import { changeSetting } from '../../actions';
import { getArchivePuzzle, getArchiveDays } from '../../selectors/settings';
import * as archiveSelectors from '../../selectors/times';
import ArchiveOptions from '../../components/archive/ArchiveOptions';

function mapStateToProps(state) {
  return {
    times: archiveSelectors.getSortedFilteredArchivedTimes(state),
    stats: archiveSelectors.getStatsForArchivedTimesForPuzzle(state),
    puzzle: getArchivePuzzle(state),
    days: getArchiveDays(state)
  };
}

export default connect(
  mapStateToProps,
  { changeSetting }
)(ArchiveOptions);
