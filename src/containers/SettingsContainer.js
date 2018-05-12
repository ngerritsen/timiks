import { connect } from 'react-redux';

import * as actions from '../actions';
import Settings from '../components/Settings'

function mapStateToProps(state) {
  const {
    theme,
    useInspectionTime,
    activationDuration,
    useManualTimeEntry
  } = state.settings;

  return {
    theme,
    useInspectionTime,
    activationDuration,
    useManualTimeEntry
  }
}

export default connect(
  mapStateToProps,
  {
    toggleInspectionTime: actions.toggleInspectionTime,
    changeTheme: actions.changeTheme,
    changeActivationDuration: actions.changeActivationDuration,
    toggleManualTimeEntry: actions.toggleManualTimeEntry
  }
)(Settings);
