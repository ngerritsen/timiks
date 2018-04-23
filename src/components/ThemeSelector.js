import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faToggleOff, faToggleOn } from '@fortawesome/fontawesome-pro-solid';

import IconButton from './IconButton';

const ThemeSelector = ({ changeTheme, theme }) => (
  <ThemeSelectorContainer>
    Night mode:
    <Toggle onClick={() => changeTheme(theme === 'dark' ? 'light' : 'dark')}>
      <FontAwesome icon={theme === 'dark' ? faToggleOn : faToggleOff} />
    </Toggle>
  </ThemeSelectorContainer>
);

ThemeSelector.propTypes = {
  changeTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired
};

const ThemeSelectorContainer = styled.div`
  color: ${props => props.theme.colors.subtleFg};
  text-align: center;
`;

const Toggle = IconButton.extend`
  position: relative;
  top: 0.35rem;
  font-size: 2.3rem;
  color: ${props => props.theme.colors.subtleFg};
  margin-left: ${props => props.theme.sizes.xs};

`;

export default ThemeSelector;
