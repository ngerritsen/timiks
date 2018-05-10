import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/fontawesome-pro-solid'

import { ACTIVATION_DURATION_OPTIONS } from '../constants/app';
import IconButton from './shared/IconButton';
import Modal from './shared/Modal';
import Section from './shared/Section';
import Button from './shared/Button';
import Selector from './shared/Selector';

const Settings = ({
  openSettings,
  closeSettings,
  changeActivationDuration,
  activationDuration,
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
          <Selector
            label="Activation delay*"
            onChange={changeActivationDuration}
            options={ACTIVATION_DURATION_OPTIONS}
            value={activationDuration}
          />
      </Section>
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
      <Section margin="md">
        <i>*For how long you have to hold spacebar, mouse or touch before starting the timer.</i>
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
  activationDuration: PropTypes.number.isRequired,
  openSettings: PropTypes.func.isRequired,
  closeSettings: PropTypes.func.isRequired,
  settingsOpen: PropTypes.bool.isRequired,
  changeActivationDuration: PropTypes.func.isRequired,
  toggleInspectionTime: PropTypes.func.isRequired,
  useInspectionTime: PropTypes.bool.isRequired,
  changeTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired
};

export default Settings;
