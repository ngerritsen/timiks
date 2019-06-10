import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

import { NOTIFICATION_ROOT_SELECTOR } from '../constants/app';
import { getBreakpoint, getSize, getZIndex, getColor } from '../helpers/theme';

const Notification = ({ message, isError, show, hideNotification }) => {
  return ReactDOM.createPortal(
    <NotificationContainer show={show}>
      <NotificationMessage error={isError} onClick={hideNotification}>
        {message}
      </NotificationMessage>
    </NotificationContainer>,
    document.querySelector(NOTIFICATION_ROOT_SELECTOR)
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  error: PropTypes.bool,
  show: PropTypes.bool,
  hideNotification: PropTypes.func.isRequired
};

const NotificationContainer = styled.div`
  transition: bottom 1.2s ease;
  display: flex;
  position: fixed;
  bottom: ${props => (props.show ? '0' : '-16rem')};
  padding: 0 ${getSize('sm')} ${getSize('xs')};
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  z-index: ${getZIndex('modal')};

  @media screen and (min-width: ${getBreakpoint('sm')}) {
    padding-bottom: ${getSize('sm')};
  }
`;

const NotificationMessage = styled.div`
  background-color: ${props => getColor(props.error ? 'red' : 'dark')(props)};
  color: ${getColor('white')};
  border-radius: 0.5rem;
  padding: ${getSize('sm')};
  width: 100%;
  pointer-events: auto;
  max-width: 540px;
  display: flex;
  justify-content: space-between;
`;

export default Notification;
