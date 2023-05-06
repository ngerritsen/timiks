import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { getLuminance, darken } from "polished";
import { getColor, getSize } from "../../helpers/theme";

const sizeToHeight = {
  sm: "2.2rem",
  md: "2.6rem",
};

const sizeToFontSize = {
  sm: "1.2rem",
  md: "1.4rem",
};

const sizeToSidePadding = {
  sm: "xs",
  md: "sm",
};

const Tag = ({ children, color, onClick, size }) => (
  <TagTag
    color={color}
    hoverable={Boolean(onClick)}
    size={size}
    onClick={(e) => onClick && onClick(e)}
  >
    {children}
  </TagTag>
);

Tag.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  color: PropTypes.string,
  withCheckbox: PropTypes.bool,
  checked: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.string,
};

Tag.defaultProps = {
  size: "md",
};

const TagTag = styled.span.attrs((props) => ({
  bg: getColor(props.color)(props) || getColor("grey")(props),
}))`
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
