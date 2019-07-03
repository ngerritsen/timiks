import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from '@fortawesome/react-fontawesome';
import faCog from '@fortawesome/fontawesome-pro-solid/faCog';

import Shortcut from './shared/Shortcut';
import { ACTIVATION_DURATION_OPTIONS, BUTTON_COLORS } from '../constants/settings';
import IconButton from './shared/IconButton';
import ToggleContent from './shared/ToggleContent';
import Section from './shared/Section';
import Select from './shared/Select';
import Checkbox from './shared/Checkbox';
import Button from './shared/Button';
import Modal from './shared/Modal';
import { getSize, getColor } from '../helpers/theme';

const Settings = ({ settings, changeSetting }) => (
  <>
    <ToggleContent
      toggle={({ show, toggle }) => (
        <IconButton onClick={show}>
          <Shortcut command="openSettings" action={toggle} />
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
                  <label>Voice alert for inspection time**</label>
                  <Checkbox
                    type="checkbox"
                    onChange={checked => changeSetting('warnForInspectionTime', checked)}
                    checked={settings.warnForInspectionTime}
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
              <Section margin="sm">
                <Setting>
                  <label>Start button color in dark mode</label>
                  <Select
                    onChange={color => changeSetting('buttonColorDarkMode', color)}
                    options={[{ label: 'Inherit', value: '' }, ...BUTTON_COLORS]}
                    value={settings.buttonColorDarkMode}
                    fullWidth
                  />
                </Setting>
              </Section>
            </Section>
            <Section margin="xs">
              <Explanation>
                *For how long you have to hold spacebar, mouse or touch before starting the timer.
              </Explanation>
            </Section>
            <Section margin="md">
              <Explanation>
                **Does not work on most mobile devices due to browser restrictions.
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
  padding-right: ${getSize('xxs')};
`;

const SectionTitle = styled.h3`
  margin: 0 0 ${getSize('sm')};
  font-weight: bold;
  font-size: 1.7rem;
`;

const Explanation = styled.span`
  margin: 0;
  padding: 0;
  color: ${getColor('subtleFg')};
  font-style: italic;
`;

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  changeSetting: PropTypes.func.isRequired
};

export default React.memo(Settings);
