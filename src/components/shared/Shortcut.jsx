import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ShortcutContext from "../../containers/ShortcutContext";

const Shortcut = ({
  registerShortcut,
  updateShortcut,
  unregisterShortcut,
  command,
  action,
}) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (!token) {
      setToken(registerShortcut(command, action));
      return;
    }

    updateShortcut(token, command, action);
  });

  useEffect(() => () => unregisterShortcut(token), []);

  return <ShortcutAnchor data-shortcut={token} />;
};

Shortcut.propTypes = {
  registerShortcut: PropTypes.func.isRequired,
  unregisterShortcut: PropTypes.func.isRequired,
  updateShortcut: PropTypes.func.isRequired,
  command: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

const ShortcutAnchor = styled.span`
  display: none;
`;

const WrappedShortcut = (props) => (
  <ShortcutContext.Consumer>
    {(context) => <Shortcut {...props} {...context} />}
  </ShortcutContext.Consumer>
);

export default WrappedShortcut;
