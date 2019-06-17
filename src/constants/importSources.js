import parseCsTimerSession from '../helpers/csTimer';
import parseTwistyTimerExport from '../helpers/twistyTimer';

export const CS_TIMER_SESSION = 'CS_TIMER_SESSION';
export const TWISTY_TIMER = 'TWISTY_TIMER';

export default [
  {
    type: CS_TIMER_SESSION,
    title: 'csTimer',
    func: parseCsTimerSession,
    fileExtension: '.csv',
    explanation:
      'Imports a single csTimer session (not a full backup). To download it from csTimer go to "Session > OP > Export CSV". Comments will not be imported. Only one puzzle per session.'
  },
  {
    type: TWISTY_TIMER,
    title: 'Twisty Timer',
    func: parseTwistyTimerExport,
    fileExtension: '.txt',
    explanation:
      'Imports a Twisty Timer export. Make sure to use the export "For other timers" option. Comments will not be imported. Only one puzzle per session. Note that Twisty Timer does not include the plus 2 penalty flag.'
  }
];
