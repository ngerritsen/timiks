import { connect } from 'react-redux';

import { toggleInspectionTime, changeTheme, openSettings, closeSettings } from '../actions';
import Settings from '../components/Settings'

function mapStateToProps(state) {
  const { settingsOpen, theme, useInspectionTime } = state.settings;
  return {
    settingsOpen,
    theme,
    useInspectionTime
  }
}

export default connect(
  mapStateToProps,
  { toggleInspectionTime, changeTheme, openSettings, closeSettings }
)(Settings);
