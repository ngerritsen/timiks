import shortid from 'shortid';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';

import ShortcutContext from './ShortcutContext';

class ShortcutProvider extends Component {
  constructor(...args) {
    super(...args);
    this.shortcuts = [];
    window.addEventListener('keydown', event => this._handleKeyDown(event));
  }

  _getChildContext() {
    return {
      registerShortcut: this._registerShortcut.bind(this),
      unregisterShortcut: this._unregisterShortcut.bind(this),
      updateShortcut: this._updateShortcut.bind(this)
    }
  }

  _handleKeyDown(event) {
    const mapping = this.props.keymap.find(m => keycode.isEventKey(event, m.key));

    if (!mapping || !mapping.commands) {
      return;
    }

    this.shortcuts.forEach(shortcut => {
      if (mapping.commands.includes(shortcut.command)) {
        shortcut.action();
      }
    });
  }

  _registerShortcut(command, action) {
    const token = shortid.generate();

    this.shortcuts = [...this.shortcuts, { token, command, action }];

    return token;
  }

  _unregisterShortcut(token) {
    this.shortcuts = this.shortcuts.filter(shortcut => shortcut.token !== token);
  }

  _updateShortcut(token, command, action) {
    this.shortcuts = this.shortcuts.map(shortcut => {
      if (shortcut.token !== token) {
        return shortcut;
      }

      return { token, command, action };
    })
  }

  render() {
    return (
      <ShortcutContext.Provider value={this._getChildContext()}>
        {this.props.children}
      </ShortcutContext.Provider>
    );
  }
}

ShortcutProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  keymap: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ShortcutProvider;
