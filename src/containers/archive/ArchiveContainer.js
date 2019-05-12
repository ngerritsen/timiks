import { connect } from 'react-redux';

import Archive from '../../components/archive/Archive';
import { changePuzzle, removeArchivedTime } from '../../actions';
import { getPuzzle } from '../../selectors/settings';
import {
  getArchivedTimesForPuzzle,
  getStatsForArchivedTimesForPuzzle
} from '../../selectors/times';

function mapStateToProps(state) {
  return {
    times: getArchivedTimesForPuzzle(state),
    stats: getStatsForArchivedTimesForPuzzle(state),
    puzzle: getPuzzle(state)
  };
}

export default connect(
  mapStateToProps,
  { changePuzzle, removeArchivedTime }
)(Archive);
