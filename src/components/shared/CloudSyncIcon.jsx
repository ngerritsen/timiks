import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { faCloud } from "@fortawesome/free-solid-svg-icons/faCloud";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons/faCloudUploadAlt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as CustomPropTypes from "../../propTypes";
import { getColor } from "../../helpers/theme";

const CloudSyncIcon = ({ time, size, fixedWidth }) => (
  <IconWrapper>
    <FontAwesomeIcon
      fixedWidth={fixedWidth}
      icon={time.dirty ? faCloudUploadAlt : faCloud}
      size={size}
    />
  </IconWrapper>
);

const IconWrapper = styled.span`
  color: ${getColor("cloudBlue")};
`;

CloudSyncIcon.propTypes = {
  time: CustomPropTypes.Time,
  size: PropTypes.string,
  fixedWidth: PropTypes.bool,
};

export default CloudSyncIcon;
