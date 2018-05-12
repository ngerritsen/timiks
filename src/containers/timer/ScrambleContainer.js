import { connect } from 'react-redux';
import Scramble from '../../components/scramble/Scramble';

function mapStateToProps(state) {
  return {
    scramble: state.scramble,
    puzzle: state.settings.puzzle,
    withDetails: true
  }
}

export default connect(mapStateToProps)(Scramble);
