import NoSleep from 'nosleep.js/dist/NoSleep.js';

let noSleep = null;

export function enable() {
  disable();

  try {
    noSleep = new NoSleep();
    noSleep.enable();
  } catch (e) {
    console.error('Failed to enabled NoSleep.');
  }
}

export function disable() {
  if (!noSleep) {
    return;
  }

  try {
    noSleep.disable();
  } catch (e) {
    console.error('Failed to disable NoSleep.');
  }
}
