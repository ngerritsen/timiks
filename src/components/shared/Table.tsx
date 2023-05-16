import styled from "styled-components";
import { transparentize } from "polished";

import { getColor, getSize } from "../../helpers/theme";
import { Color } from "../../theme";

type CellProps = {
  rightAlign?: boolean;
  highlightColor?: Color;
  color?: Color;
  bold?: boolean;
};

type HeadingCellProps = Pick<CellProps, "rightAlign">;

export const Table = styled.table`
  width: 100%;
  overflow: auto;
  border-spacing: 0;
  border-collapse: collapse;
`;

export const Cell = styled.td<CellProps>`
  text-align: ${(props) => (props.rightAlign ? "right" : "left")};
  border-top: 1px solid ${getColor("grey")};
  padding: ${getSize("xs")} ${getSize("xxs")};
  cursor: default;
  color: ${(props) => (props.color ? getColor(props.color)(props) : "inherit")};
  width: ${(props) => props.width || "auto"};
  min-width: ${(props) => props.width || "auto"};
  max-width: 0;
  font-weight: ${(props) => (props.bold ? "bold" : "inherit")};
  background-color: ${(props) =>
    props.highlightColor
      ? transparentize(0.7, getColor(props.highlightColor)(props))
      : "transparent"};
`;

export const HeadingCell = styled.th<HeadingCellProps>`
  text-align: ${(props) => (props.rightAlign ? "right" : "left")};
  padding: ${getSize("xs")} ${getSize("xxs")};
  border-bottom: 2px solid ${getColor("grey")};
  font-weight: bold;
`;
