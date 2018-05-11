import { connect } from 'react-redux';

import * as actions from '../actions';
import Settings from '../components/Settings'

function mapStateToProps(state) {
  const {
    theme,
    useInspectionTime,
    activationDuration
  } = state.settings;

  return {
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
    changeActivationDuration: actions.changeActivationDuration
  }
)(Settings);
