import { connect } from 'react-redux';

import Trainer from '../../components/trainer/Trainer';
import { getCurrentScramble, getGroupedSelectedCases } from '../../selectors/trainer';
import { selectCase, deselectCase } from '../../actions';

function mapStateToProps(state) {
  return {
    scramble: getCurrentScramble(state),
    groupedCases: getGroupedSelectedCases(state)
  };
}

export default connect(
  mapStateToProps,
  { selectCase, deselectCase }
)(Trainer);
