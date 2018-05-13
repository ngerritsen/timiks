import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/fontawesome-pro-solid'

import Shortcut from './shared/Shortcut';
import { ACTIVATION_DURATION_OPTIONS } from '../constants/app';
import IconButton from './shared/IconButton';
import ModalContainer from '../containers/shared/ModalContainer';
import Section from './shared/Section';
import Selector from './shared/Selector';
import Button from './shared/Button';

const Settings = ({
  changeActivationDuration,
  activationDuration,
  toggleInspectionTime,
  useInspectionTime,
  changeTheme,
  toggleManualTimeEntry,
  useManualTimeEntry,
  theme
}) => (
  <span>
    <ModalContainer
      title="Settings"
      id="settings"
      toggle={(openModal) => (
        <IconButton onClick={openModal}>
          <Shortcut command="openSettings" action={openModal}/>
          <FontAwesome icon={faCog}/>
        </IconButton>
      )}
      content={closeModal => (
        <div>
          <Section margin="sm">
              <Selector
                label="Activation delay*"
                onChange={changeActivationDuration}
                options={ACTIVATION_DURATION_OPTIONS}
                value={activationDuration}
                numeric
                fullWidth
              />
          </Section>
          <Section margin="sm">
            <Setting>
              <span>Manual time entry</span>
              <Checkbox type="checkbox" onChange={toggleManualTimeEntry} checked={useManualTimeEntry}/>
            </Setting>
          </Section>
          <Section margin="sm">
            <Setting>
              <span>Use inspection time</span>
              <Checkbox type="checkbox" onChange={toggleInspectionTime} checked={useInspectionTime}/>
            </Setting>
          </Section>
          <Section margin="md">
            <Setting>
              <span>Night mode</span>
              <Checkbox
                type="checkbox"
                onChange={() => changeTheme(theme === 'dark' ? 'light' : 'dark')}
                checked={theme === 'dark'}
              />
            </Setting>
          </Section>
          <Section margin="md">
            <i>*For how long you have to hold spacebar, mouse or touch before starting the timer.</i>
          </Section>
          <Button onClick={closeModal}>Close</Button>
        </div>
      )}
    />
  </span>
);

const Setting = styled.label`
  display: flex;
  justify-content: space-between;
`;

const Checkbox = styled.input`
  margin-right: ${props => props.theme.sizes.xs};
  cursor: pointer;
`;

Settings.propTypes = {
  activationDuration: PropTypes.number.isRequired,
  changeActivationDuration: PropTypes.func.isRequired,
  toggleInspectionTime: PropTypes.func.isRequired,
  toggleManualTimeEntry: PropTypes.func.isRequired,
  useManualTimeEntry: PropTypes.bool.isRequired,
  useInspectionTime: PropTypes.bool.isRequired,
  changeTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired
};

export default Settings;
