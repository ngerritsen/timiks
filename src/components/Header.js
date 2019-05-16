import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import SettingsContainer from '../containers/SettingsContainer';
import KeyboardShortcuts from './KeyboardShortcuts';
import AccountContainer from '../containers/AccountContainer';

const Header = () => (
  <HeaderBar>
    <Title>Timiks</Title>
    <nav>
      <StyledNavLink activeClassName="selected" exact to="/">
        Timer
      </StyledNavLink>
      <StyledNavLink activeClassName="selected" to="/archive">
        Archive
      </StyledNavLink>
      <IconContainer>
        <KeyboardShortcuts />
      </IconContainer>
      <IconContainer>
        <SettingsContainer />
      </IconContainer>
      <AccountContainer />
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
  z-index: ${props => props.theme.zIndices.onFullScreenMask};
`;

const IconContainer = styled.span`
  margin-right: ${props => props.theme.sizes.sm};
`;

const StyledNavLink = styled(NavLink)`
  margin-right: 1.2rem;
  color: ${props => props.theme.colors.fg};
  font-weight: bold;
  text-decoration: none;
  padding-bottom: 1px;

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
