import styled from "styled-components";
import { getSize } from "../../helpers/theme";

type ToolbarProps = {
  right?: boolean;
};

type ToolbarItemProps = {
  grow?: boolean;
  shrink?: boolean;
};

export const Toolbar = styled.div<ToolbarProps>`
  display: flex;
  flex-wrap: nowrap;
  justify-content: ${(props) => (props.right ? "flex-end" : "initial")};
  align-items: center;
`;

export const ToolbarItem = styled.div<ToolbarItemProps>`
  margin-right: ${getSize("xs")};
  flex-grow: ${(props) => (props.grow ? 1 : 0)};
  flex-shrink: ${(props) => (props.shrink ? 1 : 0)};

  &:last-child {
    margin-right: 0;
  }
`;
