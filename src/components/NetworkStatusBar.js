import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons/faPlane';

import { getColor, getSize } from '../helpers/theme';

const NetworkStatusBar = ({ isOnline }) =>
  isOnline ? null : (
    <StatusBar>
      <FontAwesomeIcon size="sm" icon={faPlane} />
      &nbsp; Offline
    </StatusBar>
  );

NetworkStatusBar.propTypes = {
  isOnline: PropTypes.bool
};

const StatusBar = styled.div`
  background-color: ${getColor('orange')};
  text-align: center;
  color: ${getColor('white')};
  padding: ${getSize('xxs')};
  font-size: 1.3rem;
`;

export default NetworkStatusBar;
