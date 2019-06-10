import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import faCloud from '@fortawesome/fontawesome-pro-solid/faCloud';
import faCloudUpload from '@fortawesome/fontawesome-pro-solid/faCloudUpload';
import FontAwesome from '@fortawesome/react-fontawesome';
import * as CustomPropTypes from '../../propTypes';
import { getColor } from '../../helpers/theme';

const CloudSyncIcon = ({ time, size, fixedWidth }) => (
  <IconWrapper>
    <FontAwesome fixedWidth={fixedWidth} icon={time.dirty ? faCloudUpload : faCloud} size={size} />
  </IconWrapper>
);

const IconWrapper = styled.span`
  color: ${getColor('cloudBlue')};
`;

CloudSyncIcon.propTypes = {
  time: CustomPropTypes.Time,
  size: PropTypes.string,
  fixedWidth: PropTypes.bool
};

export default CloudSyncIcon;
