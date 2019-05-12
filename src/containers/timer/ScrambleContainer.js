import { connect } from 'react-redux';
import Scramble from '../../components/scramble/Scramble';
import { getScramble } from '../../selectors/scramble';
import { getPuzzle, isPuzzleCube } from '../../selectors/settings';

function mapStateToProps(state) {
  return {
    scramble: getScramble(state),
    puzzle: getPuzzle(state),
    puzzleIsCube: isPuzzleCube(state),
    withDetails: true
  };
}

export default connect(mapStateToProps)(Scramble);
