import { connect } from 'react-redux';

import * as actions from '../actions';
import Settings from '../components/Settings'

function mapStateToProps(state) {
  return {
    settings: state.settings
  }
}

export default connect(
  mapStateToProps,
  {
    toggleInspectionTime: actions.toggleInspectionTime,
    changeTheme: actions.changeTheme,
    changeActivationDuration: actions.changeActivationDuration,
    toggleManualTimeEntry: actions.toggleManualTimeEntry,
    toggleZeroBasedGraph: actions.toggleZeroBasedGraph
  }
)(Settings);
