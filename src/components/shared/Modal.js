import styled from 'styled-components';
import { transparentize } from 'polished';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/fontawesome-pro-solid';

import Shortcut from './Shortcut';
import IconButton from './IconButton';
import { MODAL_ROOT_SELECTOR } from '../../constants/app';

class Modal extends React.Component {
  constructor(...args) {
    super(...args);
    this.modal = null;
    this.overlay = null;
    this.onClickOverlay = this.onClickOverlay.bind(this);
  }

  componentDidMount() {
    if (this.modal) {
      this.modal.focus();
    }
  }

  onClickOverlay(event) {
    if (event.target === this.overlay) {
      this.props.onClose();
    }
  }

  render() {
    const { title, children, onClose } = this.props;

    return ReactDOM.createPortal(
      <ModalOverlay
        data-modal
        innerRef={el => {
          this.overlay = el;
        }}
        onClick={this.onClickOverlay}
      >
        <ModalBox
          innerRef={el => {
            this.modal = el;
          }}
          tabIndex={-1}
        >
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
            <IconButton color="subtleFg" onClick={onClose}>
              <Shortcut command="closeModal" action={onClose} />
              <FontAwesome icon={faTimes} />
            </IconButton>
          </ModalHeader>
          {children}
        </ModalBox>
      </ModalOverlay>,
      document.querySelector(MODAL_ROOT_SELECTOR)
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

const ModalOverlay = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  bottom: 0;
  padding: ${props => props.theme.sizes.xs};
  left: 0;
  right: 0;
  background-color: ${props => transparentize(0.6, props.theme.colors.fg)};
  justify-content: center;
  align-items: center;
  z-index: ${props => props.theme.zIndices.modal};
`;

const ModalBox = styled.div`
  background-color: ${props => props.theme.colors.bg};
  border-radius: 0.5rem;
  padding: ${props => props.theme.sizes.sm};
  width: 100%;
  max-width: 540px;
  max-height: calc(100vh - ${props => props.theme.sizes.sm});
  overflow: auto;

  &:focus {
    outline: none;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 ${props => props.theme.sizes.md};
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
  margin: 0 ${props => props.theme.sizes.sm} 0 0;
`;

export default Modal;
