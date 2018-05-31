import shortid from 'shortid';
import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    const { ctrlKey, metaKey, shiftKey, altKey } = event;

    if (!this.props.stopped || ctrlKey || metaKey || shiftKey || altKey) {
      return;
    }

    const mapping = this.props.keymap.find(m => keycode.isEventKey(event, m.key));

    if (!mapping || !mapping.commands) {
      return;
    }

    this.shortcuts.forEach(shortcut => {
      if (!mapping.commands.includes(shortcut.command)) {
        return
      }

      const modalEl = document.querySelector('[data-modal]');
      const shortcutEl = document.querySelector(`[data-shortcut="${shortcut.token}"]`);

      if (!shortcutEl) {
        return;
      }

      if (modalEl && !shortcutEl.closest('[data-modal]')) {
        return;
      }

      shortcut.action();
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
  keymap: PropTypes.arrayOf(PropTypes.object).isRequired,
  stopped: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  return {
    stopped: state.timer.stopped
  }
}

export default connect(mapStateToProps)(ShortcutProvider);
