import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

import { FULL_SCREEN_MASK_ROOT_SELECTOR } from '../constants/app';

const FullScreenMask = ({ level }) => (
  ReactDOM.createPortal(
    <StyledFullScreenMask level={level} data-activation/>,
    document.querySelector(FULL_SCREEN_MASK_ROOT_SELECTOR)
  )
);

FullScreenMask.propTypes = {
  level: PropTypes.number.isRequired
};

const StyledFullScreenMask = styled.div`
  position: fixed;
  z-index: ${props => props.theme.zIndices.fullScreenMask};
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.colors.bg};
`;

export default FullScreenMask;
