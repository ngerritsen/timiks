import React from "react";
import styled from "styled-components";
import { faCloud } from "@fortawesome/free-solid-svg-icons/faCloud";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons/faCloudUploadAlt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getColor } from "../../helpers/theme";
import { Time } from "../../types";

type CloudSyncIconProps = {
  time: Pick<Time, "dirty">;
  size?: SizeProp;
  fixedWidth?: boolean;
};

const CloudSyncIcon = ({ time, size, fixedWidth }: CloudSyncIconProps) => (
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

export default CloudSyncIcon;
