const keymap = [
  {
    key: ',',
    commands: ['openSettings'],
    description: 'Open the settings'
  },
  {
    key: 'a',
    commands: ['archiveTimes'],
    description: 'Archive the current times'
  },
  {
    key: 'c',
    commands: ['clearTimes'],
    description: 'Clear the current times'
  },
  {
    key: 'd',
    commands: ['dnfLastTime'],
    description: 'Toggle DNF for the last time'
  },
  {
    key: 'backspace',
    commands: ['removeLastTime'],
    description: 'Remove the last time'
  },
  {
    key: 'esc',
    commands: ['closeModal'],
    description: 'Close any modal'
  },
  {
    key: 'i',
    commands: ['toggleInspectionTime'],
    description: 'Toggle inspection time'
  },
  {
    key: 'k',
    commands: ['showKeyboardShortcuts'],
    description: 'Show keyboard shortcuts'
  },
  {
    key: 'm',
    commands: ['toggleManualTimeEntry'],
    description: 'Toggle manual time entry'
  },
  {
    key: 'n',
    commands: ['toggleDarkMode'],
    description: 'Toggle dark mode'
  },
  {
    key: 'p',
    commands: ['plus2LastTime'],
    description: 'Toggle +2 penalty for the last time'
  },
  {
    key: 'r',
    commands: ['refreshScramble'],
    description: 'Refresh the current scramble'
  },
  {
    key: 's',
    commands: ['showScramble'],
    description: 'Show scramble details (only for cubes)'
  },
  {
    key: 'space',
    commands: [],
    description: 'Start/stop the timer'
  }
];

export default keymap;
