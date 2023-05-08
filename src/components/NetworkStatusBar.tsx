import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons/faPlane";

import { getColor, getSize } from "../helpers/theme";
import { useSelector } from "react-redux";
import { isOnline } from "../selectors/network";

const NetworkStatusBar = () =>
  useSelector(isOnline) ? null : (
    <StatusBar>
      <FontAwesomeIcon size="sm" icon={faPlane} />
      &nbsp; Offline
    </StatusBar>
  );

const StatusBar = styled.div`
  background-color: ${getColor("orange")};
  text-align: center;
  color: ${getColor("white")};
  padding: ${getSize("xxs")};
  font-size: 1.3rem;
`;

export default NetworkStatusBar;
