import styled from 'styled-components';
import React from 'react';
import ReactDOM from 'react-dom';

import { FULL_SCREEN_MASK_ROOT_SELECTOR } from '../../constants/app';
import { getZIndex, getColor } from '../../helpers/theme';

const FullScreenMask = () =>
  ReactDOM.createPortal(
    <StyledFullScreenMask />,
    document.querySelector(FULL_SCREEN_MASK_ROOT_SELECTOR)
  );

const StyledFullScreenMask = styled.div`
  position: fixed;
  z-index: ${getZIndex('fullScreenMask')};
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${getColor('bg')};
`;

export default FullScreenMask;
