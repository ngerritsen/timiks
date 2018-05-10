import { connect } from 'react-redux';

import * as actions from '../actions';
import Settings from '../components/Settings'

function mapStateToProps(state) {
  const {
    settingsOpen,
    theme,
    useInspectionTime,
    activationDuration
  } = state.settings;

  return {
    settingsOpen,
    theme,
    useInspectionTime,
    activationDuration
  }
}

export default connect(
  mapStateToProps,
  {
    toggleInspectionTime: actions.toggleInspectionTime,
    changeTheme: actions.changeTheme,
    openSettings: actions.openSettings,
    closeSettings: actions.closeSettings,
    changeActivationDuration: actions.changeActivationDuration
  }
)(Settings);
