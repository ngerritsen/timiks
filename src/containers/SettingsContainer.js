import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Settings from '../components/Settings';
import { openSettings, closeSettings, changePuzzle } from '../actions';

function mapStateToProps(state) {
  return {
    ...state.settings
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ openSettings, closeSettings, changePuzzle }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
