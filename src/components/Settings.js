import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from '@fortawesome/react-fontawesome';
import faCog from '@fortawesome/fontawesome-pro-solid/faCog';

import Shortcut from './shared/Shortcut';
import { ACTIVATION_DURATION_OPTIONS, BUTTON_COLORS } from '../constants/app';
import IconButton from './shared/IconButton';
import ToggleContent from './shared/ToggleContent';
import Section from './shared/Section';
import Select from './shared/Select';
import Checkbox from './shared/Checkbox';
import Button from './shared/Button';
import Modal from './shared/Modal';

const Settings = ({ settings, changeSetting }) => (
  <>
    <ToggleContent
      toggle={({ show }) => (
        <IconButton onClick={show}>
          <Shortcut command="openSettings" action={show} />
          <Shortcut
            command="toggleDarkMode"
            action={() => changeSetting('theme', settings.theme === 'dark' ? 'light' : 'dark')}
          />
          <FontAwesome icon={faCog} fixedWidth />
        </IconButton>
      )}
      content={({ hide }) => (
        <Modal title="Settings" onClose={hide}>
          <>
            <Section margin="md">
              <SectionTitle>Timer</SectionTitle>
              <Section margin="sm">
                <Setting>
                  <label>Activation delay*</label>
                  <Select
                    onChange={delay => changeSetting('activationDuration', delay)}
                    options={ACTIVATION_DURATION_OPTIONS}
                    value={settings.activationDuration}
                    numeric
                    fullWidth
                  />
                </Setting>
              </Section>
              <Section margin="sm">
                <Setting>
                  <label>Use inspection time</label>
                  <Checkbox
                    type="checkbox"
                    onChange={checked => changeSetting('useInspectionTime', checked)}
                    checked={settings.useInspectionTime}
                  />
                </Setting>
              </Section>
              <Section margin="sm">
                <Setting>
                  <label>Manual time entry</label>
                  <Checkbox
                    type="checkbox"
                    onChange={checked => changeSetting('useManualTimeEntry', checked)}
                    checked={settings.useManualTimeEntry}
                  />
                </Setting>
              </Section>
              <Section margin="sm">
                <Setting>
                  <label>Hide time during solve</label>
                  <Checkbox
                    type="checkbox"
                    inverse
                    onChange={checked => changeSetting('showTimerTime', checked)}
                    checked={settings.showTimerTime}
                  />
                </Setting>
              </Section>
            </Section>
            <Section margin="md">
              <SectionTitle>User Interface</SectionTitle>
              <Section margin="sm">
                <Setting>
                  <label>Dark mode</label>
                  <Checkbox
                    type="checkbox"
                    onChange={checked => changeSetting('theme', checked ? 'dark' : 'light')}
                    checked={settings.theme === 'dark'}
                  />
                </Setting>
              </Section>
              <Section margin="sm">
                <Setting>
                  <label>Start button color</label>
                  <Select
                    onChange={color => changeSetting('buttonColor', color)}
                    options={BUTTON_COLORS}
                    value={settings.buttonColor}
                    fullWidth
                  />
                </Setting>
              </Section>
            </Section>
            <Section margin="md">
              <Explanation>
                *For how long you have to hold spacebar, mouse or touch before starting the timer.
              </Explanation>
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
  height: 2.2rem;
  align-items: center;
  padding-right: ${props => props.theme.sizes.xxs};
`;

const SectionTitle = styled.h3`
  margin: 0 0 ${props => props.theme.sizes.sm};
  font-weight: bold;
  font-size: 1.7rem;
`;

const Explanation = styled.span`
  margin: 0;
  padding: 0;
  color: ${props => props.theme.colors.subtleFg};
  font-style: italic;
`;

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  changeSetting: PropTypes.func.isRequired
};

export default React.memo(Settings);
