import { connect } from 'react-redux';

import * as actions from '../actions';
import Settings from '../components/Settings';
import { getSettings } from '../selectors/settings';

function mapStateToProps(state) {
  return {
    settings: getSettings(state)
  };
}

export default connect(
  mapStateToProps,
  {
    toggleInspectionTime: actions.toggleInspectionTime,
    toggleShowHelpText: actions.toggleShowHelpText,
    changeTheme: actions.changeTheme,
    changeActivationDuration: actions.changeActivationDuration,
    toggleManualTimeEntry: actions.toggleManualTimeEntry
  }
)(Settings);
