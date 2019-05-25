import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/fontawesome-pro-solid';

import Shortcut from './shared/Shortcut';
import { ACTIVATION_DURATION_OPTIONS } from '../constants/app';
import IconButton from './shared/IconButton';
import ToggleContent from './ToggleContent';
import Section from './shared/Section';
import Selector from './shared/Selector';
import Button from './shared/Button';
import Modal from './shared/Modal';

const Settings = ({
  settings,
  changeActivationDuration,
  toggleInspectionTime,
  changeTheme,
  toggleManualTimeEntry
}) => (
  <>
    <ToggleContent
      toggle={({ show }) => (
        <IconButton onClick={show}>
          <Shortcut command="openSettings" action={show} />
          <FontAwesome icon={faCog} fixedWidth />
        </IconButton>
      )}
      content={({ hide }) => (
        <Modal title="Settings" onClose={hide}>
          <>
            <Section margin="sm">
              <Setting>
                <label>Activation delay</label>
                <Selector
                  label="Activation delay*"
                  onChange={changeActivationDuration}
                  options={ACTIVATION_DURATION_OPTIONS}
                  value={settings.activationDuration}
                  numeric
                  fullWidth
                />
              </Setting>
            </Section>
            <Section margin="sm">
              <Setting>
                <label>Manual time entry</label>
                <Checkbox
                  type="checkbox"
                  onChange={toggleManualTimeEntry}
                  checked={settings.useManualTimeEntry}
                />
              </Setting>
            </Section>
            <Section margin="sm">
              <Setting>
                <label>Use inspection time</label>
                <Checkbox
                  type="checkbox"
                  onChange={toggleInspectionTime}
                  checked={settings.useInspectionTime}
                />
              </Setting>
            </Section>
            <Section margin="md">
              <Setting>
                <label>Night mode</label>
                <Checkbox
                  type="checkbox"
                  onChange={() => changeTheme(settings.theme === 'dark' ? 'light' : 'dark')}
                  checked={settings.theme === 'dark'}
                />
              </Setting>
            </Section>
            <Section margin="md">
              <p>
                <i>
                  *For how long you have to hold spacebar, mouse or touch before starting the timer.
                </i>
              </p>
            </Section>
            <Button onClick={hide}>Close</Button>
          </>
        </Modal>
      )}
    />
  </>
);

const Setting = styled.label`
  display: flex;
  justify-content: space-between;
  height: 2.4rem;
  align-items: center;
`;

const Checkbox = styled.input`
  margin-right: ${props => props.theme.sizes.xs};
  cursor: pointer;
`;

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  changeActivationDuration: PropTypes.func.isRequired,
  toggleInspectionTime: PropTypes.func.isRequired,
  toggleManualTimeEntry: PropTypes.func.isRequired,
  changeTheme: PropTypes.func.isRequired
};

export default React.memo(Settings);
