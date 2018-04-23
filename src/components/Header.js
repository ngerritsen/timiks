import React from 'react';
import styled from 'styled-components';

import { NavLink } from 'react-router-dom'

const Header = () => (
  <HeaderBar>
    <Title>Timiks</Title>
    <nav>
      <StyledNavLink activeClassName="selected" exact to="/">Timer</StyledNavLink>
      <StyledNavLink activeClassName="selected" to="/archive">Archive</StyledNavLink>
    </nav>
  </HeaderBar>
);

const HeaderBar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  position: relative;
  margin: 0;
  font-size: 2.6rem;
  font-weight: bold;
  z-index: ${props => props.theme.zIndices.onFullScreenMask}
`;

const StyledNavLink = styled(NavLink)`
  margin-left: ${props => props.theme.sizes.sm};
  color: ${props => props.theme.colors.fg};
  font-weight: bold;
  text-decoration: none;
  padding-bottom: 2px;

  &:hover,
  &:focus,
  &:visited {
    color: ${props => props.theme.colors.fg};
    text-decoration: none;
  }

  &:hover,
  &:focus {
    border-bottom: 2px solid ${props => props.theme.colors.grey};
  }

  &.selected {
    border-bottom: 2px solid ${props => props.theme.colors.fg};
  }
`;

export default Header;
