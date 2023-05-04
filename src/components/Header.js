import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons/faDumbbell";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import KeyboardShortcuts from "./KeyboardShortcuts";
import AccountContainer from "../containers/AccountContainer";
import { getZIndex, getColor } from "../helpers/theme";
import { VisibleFrom } from "./shared/Visibility";
import Settings from "./Settings";

const Header = () => (
  <HeaderBar>
    <Title>Timiks</Title>
    <nav>
      <StyledNavLink to="/">Timer</StyledNavLink>
      <StyledNavLink to="/archive">Archive</StyledNavLink>
      <StyledNavLink to="/trainer">
        <FontAwesomeIcon icon={faDumbbell} />
      </StyledNavLink>
      <KeyboardShortcutsIconContainer breakpoint="sm" display="inline">
        <KeyboardShortcuts />
      </KeyboardShortcutsIconContainer>
      <IconContainer>
        <Settings />
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
  z-index: ${getZIndex("onFullScreenMask")};
`;

const IconContainer = styled.span`
  margin-right: 1rem;
`;

const KeyboardShortcutsIconContainer = styled(VisibleFrom)`
  margin-right: 1rem;
`;

const StyledNavLink = styled(NavLink)`
  margin-right: 1.2rem;
  color: ${getColor("fg")};
  font-weight: bold;
  text-decoration: none;
  padding-bottom: 1px;

  &:hover,
  &:focus,
  &:visited {
    color: ${getColor("fg")};
    text-decoration: none;
  }

  &:hover,
  &:focus {
    border-bottom: 2px solid ${getColor("grey")};
  }

  &.active {
    border-bottom: 2px solid ${getColor("fg")};
  }
`;

export default Header;
