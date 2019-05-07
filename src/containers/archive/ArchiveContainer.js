import { connect } from 'react-redux';

import Archive from '../../components/archive/Archive';
import { changePuzzle, removeArchivedTime } from '../../actions';
import { calculateStats } from '../../helpers/times';
import { getPuzzle } from '../../selectors/settingsSelector';
import { getArchivedTimesForPuzzle } from '../../selectors/timesSelectors';

function mapStateToProps(state) {
  const times = getArchivedTimesForPuzzle(state);

  return {
    times,
    stats: calculateStats(times),
    puzzle: getPuzzle(state)
  }
}

export default connect(
  mapStateToProps,
  { changePuzzle, removeArchivedTime }
)(Archive);
