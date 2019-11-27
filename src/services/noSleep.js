import NoSleep from 'nosleep.js/dist/NoSleep.js';
import * as Sentry from '@sentry/browser';

let noSleep = null;

export function enable() {
  disable();

  try {
    noSleep = new NoSleep();
    noSleep.enable();
  } catch (err) {
    Sentry.captureException(err);
  }
}

export function disable() {
  if (!noSleep) {
    return;
  }

  try {
    noSleep.disable();
  } catch (err) {
    Sentry.captureException(err);
  }
}
