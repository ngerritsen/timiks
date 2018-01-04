import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PuzzleSelector from '../components/PuzzleSelector';
import { changePuzzle } from '../actions';

function mapStateToProps(state) {
  return {
    puzzle: state.settings.puzzle
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changePuzzle }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PuzzleSelector);
