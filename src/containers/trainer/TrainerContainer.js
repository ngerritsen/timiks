import { connect } from 'react-redux';

import Trainer from '../../components/trainer/Trainer';
import { getCurrentScramble } from '../../selectors/trainer';

function mapStateToProps(state) {
  return {
    scramble: getCurrentScramble(state)
  };
}

export default connect(mapStateToProps)(Trainer);
