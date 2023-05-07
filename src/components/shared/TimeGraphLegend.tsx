import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons/faCircle";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle";

import { getColor, getSize } from "../../helpers/theme";
import { GraphLine } from "../../types";
import { Color } from "chart.js";

type TimeGraphLegendProps = {
  lines: GraphLine[];
  enableLine: (name: string) => void;
  disableLine: (name: string) => void;
};

type LegendItemLabelProps = {
  enabled: boolean;
};

type LegendItemIconProps = {
  color: Color;
};

const TimeGraphLegend = ({
  lines,
  enableLine,
  disableLine,
}: TimeGraphLegendProps) => {
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

const LegendItemIcon = styled.span<LegendItemIconProps>`
  position; relative;
  top: 0.1rem;
  color: ${(props) => getColor(props.color)(props)};
  margin-right: ${getSize("xxs")};
`;

const LegendItemLabel = styled.span<LegendItemLabelProps>`
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
