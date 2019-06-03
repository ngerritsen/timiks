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
import Select from './shared/Select';
import Checkbox from './shared/Checkbox';
import Button from './shared/Button';
import Modal from './shared/Modal';

const Settings = ({
  settings,
  changeActivationDuration,
  toggleInspectionTime,
  changeTheme,
  toggleManualTimeEntry,
  toggleShowHelpText
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
            <SectionTitle>Timer</SectionTitle>
            <Section margin="sm">
              <Setting>
                <label>Activation delay*</label>
                <Select
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
            <Section margin="md">
              <Setting>
                <label>Use inspection time</label>
                <Checkbox
                  type="checkbox"
                  onChange={toggleInspectionTime}
                  checked={settings.useInspectionTime}
                />
              </Setting>
            </Section>
            <SectionTitle>User interface</SectionTitle>
            <Section margin="sm">
              <Setting>
                <label>Show help text</label>
                <Checkbox
                  type="checkbox"
                  onChange={toggleShowHelpText}
                  checked={settings.showHelpText}
                />
              </Setting>
            </Section>
            <Section margin="md">
              <Setting>
                <label>Dark mode</label>
                <Checkbox
                  type="checkbox"
                  onChange={() => changeTheme(settings.theme === 'dark' ? 'light' : 'dark')}
                  checked={settings.theme === 'dark'}
                />
              </Setting>
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

const Explanation = styled.span`
  margin: 0;
  padding: 0;
  color: ${props => props.theme.colors.subtleFg};
  font-style: italic;
`;

const SectionTitle = styled.p`
  display: block;
  font-size: 1.7rem;
  font-weight: bold;
  padding: 0;
  margin: 0 0 ${props => props.theme.sizes.sm};
`;

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  changeActivationDuration: PropTypes.func.isRequired,
  toggleInspectionTime: PropTypes.func.isRequired,
  toggleShowHelpText: PropTypes.func.isRequired,
  toggleManualTimeEntry: PropTypes.func.isRequired,
  changeTheme: PropTypes.func.isRequired
};

export default React.memo(Settings);
