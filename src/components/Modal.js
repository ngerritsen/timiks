import styled from 'styled-components';
import { transparentize } from 'polished';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

import { MODAL_ROOT_SELECTOR } from '../constants/app';

class Modal extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.isOpen && !prevProps.isOpen) {
      document.activeElement.blur();
      document.querySelector(MODAL_ROOT_SELECTOR).focus();
    }
  }

  render () {
    const { isOpen, title, children } = this.props;
    if (!isOpen) {
      return null
    }

    return ReactDOM.createPortal(
      <ModalOverlay data-modal>
        <ModalBox ref={el => this.modalBoxEl = el}>
          <ModalTitle>{title}</ModalTitle>
          {children}
        </ModalBox>
      </ModalOverlay>,
      document.querySelector(MODAL_ROOT_SELECTOR)
    )
  }
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  title: PropTypes.string.isRequired
};

const ModalOverlay = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  bottom: 0;
  padding: ${props => props.theme.sizes.sm};
  left: 0;
  right: 0;
  background-color: ${props => transparentize(0.6, props.theme.colors.fg)};
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  background-color: ${props => props.theme.colors.bg};
  border-radius: 0.5rem;
  padding: ${props => props.theme.sizes.sm};
  width: 100%;
  max-width: 540px;
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
  margin: 0 0 ${props => props.theme.sizes.md};
`;

export default Modal;
