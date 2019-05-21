import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/fontawesome-pro-solid';
import IconButton from './shared/IconButton';

const Message = ({ message, dismiss, withPointer }) => (
  <MessageBox>
    <div className="container">
      <MessageContent>
        {withPointer && <MessagePointer />}
        <MessageText>{message}</MessageText>
        <MessageClose>
          <IconButton onClick={dismiss}>
            <FontAwesome icon={faTimes} />
          </IconButton>
        </MessageClose>
      </MessageContent>
    </div>
  </MessageBox>
);

Message.propTypes = {
  message: PropTypes.oneOfType(PropTypes.string, PropTypes.node),
  dismiss: PropTypes.func.isRequired,
  withPointer: PropTypes.bool
};

const MessageBox = styled.div`
  color: ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.blue};
  padding: 2rem 0;
`;

const MessageContent = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  line-height: 1.5;
`;

const MessagePointer = styled.div`
  content: '';
  width: 0;
  height: 0;
  border-left: 0.8rem solid transparent;
  border-right: 0.8rem solid transparent;
  border-top: 0.9rem solid ${props => props.theme.colors.blue};
  position: absolute;
  bottom: calc(-2.9rem);
  right: 0.1rem;
`;

const MessageText = styled.div`
  flex-grow: 1;
`;

const MessageClose = styled.div`
  margin-left: ${props => props.theme.sizes.md};
  margin-right: ${props => props.theme.sizes.xxs};
  display: flex;
  align-items: center;
`;

export default Message;
