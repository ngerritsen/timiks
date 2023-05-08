import styled from "styled-components";
import { getBreakpoint } from "../../helpers/theme";
import { Breakpoint } from "../../theme";

type VisibleFromProps = {
  breakpoint: Breakpoint;
  display?: "inline";
};

type HiddenFromProps = VisibleFromProps;

export const VisibleFrom = styled.div<VisibleFromProps>`
  display: none;

  @media screen and (min-width: ${(props) =>
      getBreakpoint(props.breakpoint)(props)}) {
    display: ${(props) => props.display || "block"};
  }
`;

export const HiddenFrom = styled.div<HiddenFromProps>`
  display: ${(props) => props.display || "block"};

  @media screen and (min-width: ${(props) =>
      getBreakpoint(props.breakpoint)(props)}) {
    display: none;
  }
`;
