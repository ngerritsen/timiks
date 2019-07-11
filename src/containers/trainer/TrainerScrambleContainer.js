import { connect } from 'react-redux';

import Scramble from '../../components/scramble/Scramble';
import { getCurrentScramble } from '../../selectors/trainer';
import { DEFAULT_PUZZLE } from '../../constants/settings';

function mapStateToProps(state) {
  return {
    scramble: getCurrentScramble(state),
    puzzle: DEFAULT_PUZZLE
  };
}

export default connect(mapStateToProps)(Scramble);
