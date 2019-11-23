import { connect } from 'react-redux';

import { login, logout } from '../actions';
import Account from '../components/Account';
import * as authenticationSelectors from '../selectors/authentication';
import { isOnline } from '../selectors/network';

function mapStateToProps(state) {
  return {
    isOnline: isOnline(state),
    isLoggedIn: authenticationSelectors.isLoggedIn(state),
    isLoggingIn: authenticationSelectors.isLoggingIn(state),
    isLoggingOut: authenticationSelectors.isLoggingOut(state),
    displayName: authenticationSelectors.getDisplayName(state),
    isInitialized: authenticationSelectors.isInitialized(state),
    email: authenticationSelectors.getEmail(state),
    avatarUrl: authenticationSelectors.getAvatarUrl(state)
  };
}

export default connect(mapStateToProps, { login, logout })(Account);
