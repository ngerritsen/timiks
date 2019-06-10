import styled from 'styled-components';
import { getBreakpoint } from '../../helpers/theme';

export const VisibleFrom = styled.div`
  display: none;

  @media screen and (min-width: ${props => getBreakpoint(props.breakpoint)(props)}) {
    display: ${props => props.display || 'block'};
  }
`;

export const HiddenFrom = styled.div`
  display: ${props => props.display || 'block'};

  @media screen and (min-width: ${props => getBreakpoint(props.breakpoint)(props)}) {
    display: none;
  }
`;
