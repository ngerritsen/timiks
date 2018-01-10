import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { FULL_SCREEN_BUTTON_ROOT_SELECTOR } from '../constants/app';

const FullScreenButton = ({ onClick }) => (
  ReactDOM.createPortal(
    <StyledFullScreenButton onClick={onClick}/>,
    document.querySelector(FULL_SCREEN_BUTTON_ROOT_SELECTOR)
  )
);

const StyledFullScreenButton = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
`;

export default FullScreenButton;
