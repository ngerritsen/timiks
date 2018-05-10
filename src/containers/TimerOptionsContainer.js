import { connect } from 'react-redux';

import TimerOptions from '../components/timer/TimerOptions';
import { changePuzzle, refreshScramble } from '../actions';

function mapStateToProps(state) {
  return {
    puzzle: state.settings.puzzle
  };
}

export default connect(
  mapStateToProps,
  { changePuzzle, refreshScramble }
)(TimerOptions);
