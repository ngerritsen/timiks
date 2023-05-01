import React from "react";
import PropTypes from "prop-types";
import Message from "../shared/Message";

export const LoginPromotion = ({ dismissLoginPromotion, shouldPromoteLogin }) =>
  shouldPromoteLogin ? (
    <Message
      message="Login to save your times to the cloud and sync them between your devices!"
      dismiss={dismissLoginPromotion}
      withPointer
    />
  ) : null;

LoginPromotion.propTypes = {
  shouldPromoteLogin: PropTypes.bool,
  dismissLoginPromotion: PropTypes.func.isRequired,
};

export default LoginPromotion;
