import NoSleep from 'nosleep.js/dist/NoSleep.js';

let noSleep = null;

export function enable() {
  disable();
  noSleep = new NoSleep();
  noSleep.enable();
}

export function disable() {
  if (!noSleep) {
    return;
  }

  noSleep.disable();
}
