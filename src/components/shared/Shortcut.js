import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ShortcutContext from '../../containers/ShortcutContext';

class Shortcut extends Component {
  constructor(props) {
    super(props);
    const { registerShortcut, command, action } = props;
    this.token = registerShortcut(command, action);
  }

  componentWillReceiveProps(nextProps) {
    const { updateShortcut, command, action } = nextProps;
    updateShortcut(this.token, command, action);
  }

  componentWillUnmount() {
    this.props.unregisterShortcut(this.token);
  }

  render() {
    return <ShortcutAnchor data-shortcut={this.token} />;
  }
}

Shortcut.propTypes = {
  registerShortcut: PropTypes.func.isRequired,
  unregisterShortcut: PropTypes.func.isRequired,
  updateShortcut: PropTypes.func.isRequired,
  command: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired
}

const ShortcutAnchor = styled.span`
  display: none;
`;

const WrappedShortcut = props => (
  <ShortcutContext.Consumer>
    {context => <Shortcut {...props} {...context} />}
  </ShortcutContext.Consumer>
);

export default WrappedShortcut;
