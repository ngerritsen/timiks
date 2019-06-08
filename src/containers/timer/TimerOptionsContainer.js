import { connect } from 'react-redux';

import TimerOptions from '../../components/timer/TimerOptions';
import { changeSetting, refreshScramble } from '../../actions';
import { getPuzzle } from '../../selectors/settings';

function mapStateToProps(state) {
  return {
    puzzle: getPuzzle(state)
  };
}

export default connect(
  mapStateToProps,
  { changeSetting, refreshScramble }
)(TimerOptions);
