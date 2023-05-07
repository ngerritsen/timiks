import React, { MouseEvent } from "react";
import styled from "styled-components";
import { getLuminance, darken } from "polished";
import { getColor, getSize } from "../../helpers/theme";
import { Color, Size } from "../../theme";

type TagSize = "sm" | "md";

const sizeToHeight = {
  sm: "2.2rem",
  md: "2.6rem",
};

const sizeToFontSize = {
  sm: "1.2rem",
  md: "1.4rem",
};

const sizeToSidePadding: Record<TagSize, Size> = {
  sm: "xs",
  md: "sm",
};

type TagProps = {
  children: React.JSX.Element;
  color: Color;
  withCheckbox?: boolean;
  checked?: boolean;
  onClick: (event: MouseEvent) => void;
  size: keyof typeof sizeToHeight;
};

type TagTagProps = {
  color: Color;
  size: keyof typeof sizeToHeight;
  bg?: Color;
  hoverable?: boolean;
};

const Tag = ({ children, color, onClick, size }: TagProps) => (
  <TagTag
    color={color}
    hoverable={Boolean(onClick)}
    size={size}
    onClick={(e) => onClick && onClick(e)}
  >
    {children}
  </TagTag>
);

Tag.defaultProps = {
  size: "md",
};

const TagTag = styled.span.attrs<TagTagProps>((props) => ({
  bg: getColor(props.color)(props) || getColor("grey")(props),
}))<TagTagProps>`
  display: inline-block;
  position: relative;
  height: ${(props) => sizeToHeight[props.size]};
  line-height: calc(${(props) => sizeToHeight[props.size]} - 0.1rem);
  background-color: ${(props) => props.bg};
  color: ${(props) =>
    getLuminance(props.bg) > 0.5
      ? getColor("black")(props)
      : getColor("white")(props)};
  padding: 0 ${(props) => getSize(sizeToSidePadding[props.size])(props)};
  text-align: center;
  font-size: ${(props) => sizeToFontSize[props.size]};
  font-weight: bold;
  border-radius: 99rem;
  cursor: ${(props) => (props.hoverable ? "pointer" : "normal")};

  &:hover,
  &:focus {
    background-color: ${(props) =>
      darken(props.hoverable ? 0.07 : 0, props.bg)};
  }
`;

export default Tag;
