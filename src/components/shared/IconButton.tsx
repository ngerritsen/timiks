import styled from "styled-components";
import { getColor } from "../../helpers/theme";
import { Color } from "../../theme";

type IconButtonProps = {
  color?: Color;
};

export default styled.button<IconButtonProps>`
  border: none;
  background: transparent;
  padding: 0;
  color: ${(props) => getColor(props.color)(props) || "inherit"};
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:focus,
  &:hover {
    opacity: 0.8;
  }
`;
