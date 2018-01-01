import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Settings from '../components/Settings';
import { changePuzzle } from '../actions';

function mapStateToProps(state) {
  return {
    ...state.settings
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changePuzzle }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
