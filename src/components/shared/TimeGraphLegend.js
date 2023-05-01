import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons/faCircle";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle";

import * as CustomPropTypes from "../../propTypes";
import { getColor, getSize } from "../../helpers/theme";

const TimeGraphLegend = ({ lines, enableLine, disableLine }) => {
  return (
    <>
      {lines.map((line) => (
        <LegendItem
          key={line.name}
          onClick={() => {
            line.enabled ? disableLine(line.name) : enableLine(line.name);
          }}
        >
          <LegendItemIcon color={line.color}>
            <FontAwesomeIcon
              size="sm"
              icon={line.enabled ? faCheckCircle : faCircle}
            />
          </LegendItemIcon>
          <LegendItemLabel enabled={line.enabled}>{line.name}</LegendItemLabel>
        </LegendItem>
      ))}
    </>
  );
};

TimeGraphLegend.propTypes = {
  lines: PropTypes.arrayOf(CustomPropTypes.GraphLine).isRequired,
  enableLine: PropTypes.func.isRequired,
  disableLine: PropTypes.func.isRequired,
};

const LegendItemIcon = styled.span`
  position; relative;
  top: 0.1rem;
  color: ${(props) => getColor(props.color)(props)};
  margin-right: ${getSize("xxs")};
`;

const LegendItemLabel = styled.span`
  text-decoration: ${(props) => (props.enabled ? "none" : "line-through")};
`;

const LegendItem = styled.span`
  cursor: pointer;
  display: inline-block;
  color: ${getColor("subtleFg")};
  font-size: 1.3rem;
  margin-right: ${getSize("sm")};
  margin-bottom: ${getSize("xs")};

  &:last-child {
    margin-right: 0;
  }
`;

export default TimeGraphLegend;
