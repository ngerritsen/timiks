import NoSleep from "nosleep.js";
import * as Sentry from "@sentry/browser";

const noSleep = new NoSleep();

export function enable() {
  disable();

  try {
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
