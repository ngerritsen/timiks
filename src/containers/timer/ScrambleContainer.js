import { connect } from 'react-redux';
import Scramble from '../../components/scramble/Scramble';
import { getScramble } from '../../selectors/scramble';
import { getPuzzle } from '../../selectors/settings';

function mapStateToProps(state) {
  return {
    scramble: getScramble(state),
    puzzle: getPuzzle(state),
    withDetails: true
  };
}

export default connect(mapStateToProps)(Scramble);
