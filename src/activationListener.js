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
    initiateValidator: isSpacebarEvent,
    releaseValidator: isSpacebarEvent
  },
  {
    initiateEvent: 'touchstart',
    fireEvent: 'touchend',
    initiateValidator: isValidTouchClickEvent,
    releaseValidator: () => true
  },
  {
    initiateEvent: 'mousedown',
    fireEvent: 'mouseup',
    initiateValidator: isValidTouchClickEvent,
    releaseValidator: () => true
  }
];

export default function listenForActivations({ onInitiate, onFire }) {
  listeners.forEach(({
    initiateEvent,
    fireEvent,
    initiateValidator,
    releaseValidator
  }) => listenFor(
    initiateEvent,
    fireEvent,
    initiateValidator,
    releaseValidator,
    onInitiate,
    onFire
  ));
}

function listenFor(
  initiateEvent,
  fireEvent,
  initiateValidator,
  releaseValidator,
  onInitiate,
  onFire
) {
  const preventDefaultListener = event => {
    event.preventDefault();
  }

  const initiateListener = (event) => {
    if (isValidActivationEvent(event) && initiateValidator(event)) {
      event.preventDefault();

      window.removeEventListener(initiateEvent, initiateListener);

      window.addEventListener(fireEvent, fireListener);
      window.addEventListener(initiateEvent, preventDefaultListener, { passive: false });

      onInitiate();
    }
  };

  const fireListener = (event) => {
    if (releaseValidator(event)) {
      event.preventDefault();

      onFire();

      window.removeEventListener(fireEvent, fireListener);
      window.removeEventListener(initiateEvent, preventDefaultListener);

      listenFor(
        initiateEvent,
        fireEvent,
        initiateValidator,
        releaseValidator,
        onInitiate,
        onFire
      );
    }
  };

  window.addEventListener(initiateEvent, initiateListener, { passive: false });
}

function isValidActivationEvent(event) {
  return (
    !!document.querySelector('[data-activation]') &&
    !document.querySelector('[data-modal]') &&
    !event.repeat &&
    !interactiveElements.includes(String(event.target.tagName).toLowerCase()) &&
    !event.target.closest(interactiveElements.join(','))
  );
}

function isValidTouchClickEvent(event) {
  return !!event.target.closest('[data-activation]');
}

function isSpacebarEvent(event) {
  return event.keyCode === SPACEBAR_KEYCODE;
}
