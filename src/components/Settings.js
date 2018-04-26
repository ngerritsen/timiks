import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/fontawesome-pro-solid'

import IconButton from './shared/IconButton';
import Modal from './shared/Modal';
import Section from './shared/Section';
import Button from './shared/Button';

const Settings = ({
  openSettings,
  closeSettings,
  settingsOpen,
  toggleInspectionTime,
  useInspectionTime,
  changeTheme,
  theme
}) => (
  <span>
    <IconButton onClick={openSettings}><FontAwesome icon={faCog}/></IconButton>
    <Modal isOpen={settingsOpen} title="Settings">
      <Section margin="sm">
        <label>
          <Checkbox type="checkbox" onChange={toggleInspectionTime} checked={useInspectionTime}/>
          Use inspection time
        </label>
      </Section>
      <Section margin="md">
        <label>
          <Checkbox
            type="checkbox"
            onChange={() => changeTheme(theme === 'dark' ? 'light' : 'dark')}
            checked={theme === 'dark'}
          />
          Night mode
        </label>
      </Section>
      <Button onClick={closeSettings}>Close</Button>
    </Modal>
  </span>
);

const Checkbox = styled.input`
  margin-right: ${props => props.theme.sizes.xs};
  cursor: pointer;
`;

Settings.propTypes = {
  openSettings: PropTypes.func.isRequired,
  closeSettings: PropTypes.func.isRequired,
  settingsOpen: PropTypes.bool.isRequired,
  toggleInspectionTime: PropTypes.func.isRequired,
  useInspectionTime: PropTypes.bool.isRequired,
  changeTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired
};

export default Settings;
