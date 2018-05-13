import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class Shortcut extends Component {
  constructor(props, context) {
    super(props, context);
    this.token = context.registerShortcut(props.command, props.action);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    nextContext.updateShortcut(this.token, nextProps.command, nextProps.action);
  }

  componentWillUnmount() {
    this.context.unregisterShortcut(this.token);
  }

  render() {
    return <ShortcutAnchor data-shortcut={this.token} />;
  }
}

Shortcut.propTypes = {
  command: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired
}

Shortcut.contextTypes = {
  registerShortcut: PropTypes.func.isRequired,
  unregisterShortcut: PropTypes.func.isRequired,
  updateShortcut: PropTypes.func.isRequired
};

const ShortcutAnchor = styled.span`
  display: none;
`;

export default Shortcut;
