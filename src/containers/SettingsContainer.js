import { connect } from 'react-redux';

import {
  toggleInspectionTime,
  changeTheme,
  changeActivationDuration,
  toggleManualTimeEntry,
  login
} from '../actions';
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
    toggleInspectionTime,
    changeTheme,
    changeActivationDuration,
    toggleManualTimeEntry,
    login
  }
)(Settings);
