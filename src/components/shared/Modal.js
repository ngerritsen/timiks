import styled from 'styled-components';
import { transparentize } from 'polished';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/fontawesome-pro-solid';

import shortcut from '../../helpers/shortcut';
import IconButton from './IconButton';
import { MODAL_ROOT_SELECTOR } from '../../constants/app';

class Modal extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.isOpen && !prevProps.isOpen) {
      document.activeElement.blur();
      document.querySelector(MODAL_ROOT_SELECTOR).focus();
    }
  }

  render () {
    const {
      isOpen,
      title,
      toggle,
      content,
      openModal,
      closeModal,
    } = this.props;

    return (
      <span>
      {toggle && toggle(openModal)}
      {
        isOpen &&
        ReactDOM.createPortal(
          <ModalOverlay data-modal>
            <ModalBox ref={el => this.modalBoxEl = el}>
              <ModalHeader>
                <ModalTitle>{title}</ModalTitle>
                <IconButton
                  color="subtleFg"
                  onClick={closeModal}
                  data-shortcut={shortcut('esc', 'closeModal')}
                >
                  <FontAwesome icon={faTimes}/>
                </IconButton>
              </ModalHeader>
              {content(closeModal)}
            </ModalBox>
          </ModalOverlay>,
          document.querySelector(MODAL_ROOT_SELECTOR)
        )
      }
      </span>
    )
  }
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  content: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  toggle: PropTypes.func,
  showCloseButton: PropTypes.bool
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
