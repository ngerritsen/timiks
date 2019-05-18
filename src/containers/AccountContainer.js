import { connect } from 'react-redux';

import { login, logout } from '../actions';
import Account from '../components/Account';
import * as authenticationSelectors from '../selectors/authentication';

function mapStateToProps(state) {
  return {
    isLoggedIn: authenticationSelectors.isLoggedIn(state),
    isLoggingIn: authenticationSelectors.isLoggingIn(state),
    isLoggingOut: authenticationSelectors.isLoggingOut(state),
    displayName: authenticationSelectors.getDisplayName(state),
    email: authenticationSelectors.getEmail(state)
  };
}

export default connect(
  mapStateToProps,
  { login, logout }
)(Account);