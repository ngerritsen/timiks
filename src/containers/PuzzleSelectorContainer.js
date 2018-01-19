import { connect } from 'react-redux';

import PuzzleSelector from '../components/PuzzleSelector';
import { changePuzzle } from '../actions';

function mapStateToProps(state) {
  return {
    puzzle: state.settings.puzzle
  };
}

export default connect(mapStateToProps, { changePuzzle })(PuzzleSelector);
