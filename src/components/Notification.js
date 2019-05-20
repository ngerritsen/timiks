import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

import { NOTIFICATION_ROOT_SELECTOR } from '../constants/app';

const Notification = ({ message, isError, show, hideNotification }) => {
  return ReactDOM.createPortal(
    <NotificationContainer show={show}>
      <NotificationMessage onClick={hideNotification} error={isError}>
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
  transition: bottom 0.5s ease;
  display: flex;
  position: fixed;
  bottom: ${props => (props.show ? '0' : '-6rem')};
  padding: 0 ${props => props.theme.sizes.xs} ${props => props.theme.sizes.xs};
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  z-index: ${props => props.theme.zIndices.modal};

  @media screen and (min-width: 540px) {
    padding-bottom: ${props => props.theme.sizes.sm};
  }
`;

const NotificationMessage = styled.div`
  text-align: center;
  background-color: ${props => (props.error ? props.theme.colors.red : props.theme.colors.dark)};
  color: ${props => props.theme.colors.white};
  border-radius: 0.5rem;
  padding: ${props => props.theme.sizes.sm};
  width: 100%;
  pointer-events: auto;
  max-width: 540px;
`;

export default Notification;
