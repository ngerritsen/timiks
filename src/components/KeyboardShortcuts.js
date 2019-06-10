import React from 'react';
import FontAwesome from '@fortawesome/react-fontawesome';
import faKeyboard from '@fortawesome/fontawesome-pro-solid/faKeyboard';

import IconButton from './shared/IconButton';
import ToggleContent from './shared/ToggleContent';
import Shortcut from './shared/Shortcut';
import Modal from './shared/Modal';
import KeyMap from './KeyMap';

const KeyboardShortcuts = () => (
  <ToggleContent
    toggle={({ show, toggle }) => (
      <IconButton onClick={show}>
        <Shortcut command="showKeyboardShortcuts" action={toggle} />
        <FontAwesome fixedWidth icon={faKeyboard} />
      </IconButton>
    )}
    content={({ hide }) => (
      <Modal title="Keyboard shortcuts" onClose={hide}>
        <KeyMap />
      </Modal>
    )}
  />
);

export default React.memo(KeyboardShortcuts);
