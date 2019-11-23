import { connect } from 'react-redux';

import LoginPromotion from '../../components/messages/LoginPromotion';
import { dismissLoginPromotion } from '../../actions';
import { shouldPromoteLogin } from '../../selectors/loginPromotion';

function mapStateToProps(state) {
  return {
    shouldPromoteLogin: shouldPromoteLogin(state)
  };
}

export default connect(mapStateToProps, { dismissLoginPromotion })(LoginPromotion);
