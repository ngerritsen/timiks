import React from "react";
import Message from "../shared/Message";
import { useDispatch, useSelector } from "react-redux";
import { shouldPromoteLogin } from "../../selectors/loginPromotion";
import { dismissLoginPromotion } from "../../slices/loginPromotion";

export const LoginPromotion = () => {
  const dispatch = useDispatch();
  const shouldShow = useSelector(shouldPromoteLogin);

  return shouldShow ? (
    <Message
      message="Login to save your times to the cloud and sync them between your devices!"
      dismiss={() => dispatch(dismissLoginPromotion())}
      withPointer
    />
  ) : null;
};

export default LoginPromotion;
