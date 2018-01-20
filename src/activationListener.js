import { SPACEBAR_KEYCODE } from './constants/app';

const interactiveElements = [
  'input',
  'button:not([data-activation])',
  'textarea',
  'a',
  'select'
];

const listeners = [
  {
    initiateEvent: 'keydown',
    fireEvent: 'keyup',
    validator: isActivationSpacebarEvent
  },
  {
    initiateEvent: 'touchstart',
    fireEvent: 'touchend',
    validator: isActivationEvent
  },
  {
    initiateEvent: 'mousedown',
    fireEvent: 'mouseup',
    validator: isActivationEvent
  }
];

export default function listenForActivations({ onInitiate, onFire }) {
  listeners.forEach(({ initiateEvent, fireEvent, validator }) => listenFor(
    initiateEvent,
    fireEvent,
    validator,
    onInitiate,
    onFire
  ));
}

function listenFor(initiateEvent, fireEvent, validator, onInitiate, onFire) {
  const preventDefaultListener = event => {
    event.preventDefault();
  }

  const initiateListener = (event) => {
    if (validator(event)) {
      event.preventDefault();

      window.removeEventListener(initiateEvent, initiateListener);

      window.addEventListener(fireEvent, fireListener, { passive: false });
      window.addEventListener(initiateEvent, preventDefaultListener, { passive: false });

      onInitiate();
    }
  };

  const fireListener = (event) => {
    if (validator(event)) {
      event.preventDefault();

      onFire();

      window.removeEventListener(fireEvent, fireListener);
      window.removeEventListener(initiateEvent, preventDefaultListener);

      listenFor(initiateEvent, fireEvent, validator, onInitiate, onFire);
    }
  };

  window.addEventListener(initiateEvent, initiateListener, { passive: false });
}

function isActivationSpacebarEvent(event) {
  return isActivationEvent(event) && event.keyCode === SPACEBAR_KEYCODE;
}

function isActivationEvent(event) {
  return (
    !!event.target.closest('[data-activation]') &&
    !document.querySelector('[data-modal]') &&
    !interactiveElements.includes(String(event.target.tagName).toLowerCase()) &&
    !event.target.closest(interactiveElements.join(',')) &&
    !event.repeat
  )
}
