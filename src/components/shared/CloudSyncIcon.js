import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { faCloud, faCloudUpload } from '@fortawesome/fontawesome-pro-solid';
import FontAwesome from '@fortawesome/react-fontawesome';
import * as CustomPropTypes from '../../propTypes';

const CloudSyncIcon = ({ time, size, fixedWidth }) => (
  <IconWrapper stored={time.stored}>
    <FontAwesome
      fixedWidth={fixedWidth}
      icon={time.stored && !time.dirty ? faCloud : faCloudUpload}
      size={size}
    />
  </IconWrapper>
);

const IconWrapper = styled.span`
  color: ${props => (props.stored ? props.theme.colors.cloudBlue : props.theme.colors.grey)};
`;

CloudSyncIcon.propTypes = {
  time: CustomPropTypes.Time,
  size: PropTypes.string,
  fixedWidth: PropTypes.bool
};

export default CloudSyncIcon;
