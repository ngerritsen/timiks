import styled from "styled-components";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";

import { NOTIFICATION_ROOT_SELECTOR } from "../constants/dom";
import { getBreakpoint, getSize, getZIndex, getColor } from "../helpers/theme";
import {
  getMessage,
  isError as getIsError,
  shouldShow,
} from "../selectors/notifications";
import { hideNotification } from "../slices/notifications";

type NotificationContainerProps = {
  show: boolean;
};

type NotificationMessageProps = {
  error: boolean;
};

const Notification = () => {
  const dispatch = useDispatch();
  const message = useSelector(getMessage);
  const isError = useSelector(getIsError);
  const show = useSelector(shouldShow);

  return ReactDOM.createPortal(
    <NotificationContainer show={show}>
      <NotificationMessage
        error={isError}
        onClick={() => dispatch(hideNotification())}
      >
        {message}
      </NotificationMessage>
    </NotificationContainer>,
    document.querySelector(NOTIFICATION_ROOT_SELECTOR)
  );
};

const NotificationContainer = styled.div<NotificationContainerProps>`
  transition: bottom 1.2s ease;
  display: flex;
  position: fixed;
  bottom: ${(props) => (props.show ? "0" : "-16rem")};
  padding: 0 ${getSize("sm")} ${getSize("xs")};
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  z-index: ${getZIndex("modal")};

  @media screen and (min-width: ${getBreakpoint("sm")}) {
    padding-bottom: ${getSize("sm")};
  }
`;

const NotificationMessage = styled.div<NotificationMessageProps>`
  background-color: ${(props) => getColor(props.error ? "red" : "dark")(props)};
  color: ${getColor("white")};
  border-radius: 0.5rem;
  padding: ${getSize("sm")};
  width: 100%;
  pointer-events: auto;
  max-width: 540px;
  display: flex;
  justify-content: space-between;
`;

export default Notification;
