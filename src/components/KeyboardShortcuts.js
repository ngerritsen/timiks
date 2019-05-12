import React from 'react';
import styled from 'styled-components';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faKeyboard } from '@fortawesome/fontawesome-pro-solid';

import keymap from '../constants/keymap';
import Section from './shared/Section';
import IconButton from './shared/IconButton';
import ToggleContent from './ToggleContent';
import Shortcut from './shared/Shortcut';
import Modal from './shared/Modal';

const KeyboardShortcuts = () => (
  <ToggleContent
    toggle={({ show }) => (
      <IconButton onClick={show}>
        <Shortcut command="showKeyboardShortcuts" action={show} />
        <FontAwesome icon={faKeyboard} />
      </IconButton>
    )}
    content={({ hide }) => (
      <Modal title="Keyboard shortcuts" onClose={hide}>
        <>
          {keymap.map(mapping => (
            <Section margin="sm" key={mapping.key}>
              <KeyContainer>
                <Key>{mapping.key}</Key>
                <span>{mapping.description}</span>
              </KeyContainer>
            </Section>
          ))}
        </>
      </Modal>
    )}
  />
);

const KeyContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Key = styled.span`
  font-weight: bold;
  font-size: 1.4rem;
  display: inline-block;
  border-radius: 0.3rem;
  border: 1px solid ${props => props.theme.colors.grey};
  background-color: ${props => props.theme.colors.subtleBg};
  color: ${props => props.theme.colors.subtleFg};
  padding: 0.15rem 0.4rem;
`;

export default React.memo(KeyboardShortcuts);
