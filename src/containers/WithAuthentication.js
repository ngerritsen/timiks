import { connect } from 'react-redux';

import * as authenticationSelectors from '../selectors/authentication';

const WithAuthentication = ({ children, ...props }) => children(props);

function mapStateToProps(state) {
  return {
    isLoggedIn: authenticationSelectors.isLoggedIn(state)
  };
}

export default connect(mapStateToProps)(WithAuthentication);
