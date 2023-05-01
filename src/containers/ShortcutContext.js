import React from "react";

const ShortcutContext = React.createContext({
  registerShortcut: () => {},
  unregisterShortcut: () => {},
  updateShortcut: () => {},
});

export default ShortcutContext;
