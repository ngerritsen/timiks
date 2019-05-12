import keycode from 'keycode';

const inputElements = [
  'input',
  'textarea'
];

const listeners = [
  {
    initiateEvent: 'keydown',
    stopEvent: 'keydown',
    fireEvent: 'keyup',
    initiateValidator: isSpacebarEvent,
    releaseValidator: isSpacebarEvent,
    stopValidator: () => true
  },
  {
    initiateEvent: 'touchstart',
    stopEvent: 'touchstart',
    fireEvent: 'touchend',
    initiateValidator: isValidTouchClickEvent,
    releaseValidator: () => true,
    stopValidator: () => true
  },
  {
    initiateEvent: 'mousedown',
    stopEvent: 'mousedown',
    fireEvent: 'mouseup',
    initiateValidator: isValidTouchClickEvent,
    releaseValidator: () => true,
    stopValidator: () => true
  }
];

export default function listenForActivations({ onInitiate, onFire, onStop }) {
  listeners.forEach(({
    initiateEvent,
    fireEvent,
    stopEvent,
    initiateValidator,
    releaseValidator,
    stopValidator
  }) => listenFor(
    initiateEvent,
    fireEvent,
    stopEvent,
    initiateValidator,
    releaseValidator,
    stopValidator,
    onInitiate,
    onFire,
    onStop
  ));
}

function listenFor(
  initiateEvent,
  fireEvent,
  stopEvent,
  initiateValidator,
  releaseValidator,
  stopValidator,
  onInitiate,
  onFire,
  onStop
) {
  const preventDefaultListener = event => {
    event.preventDefault();
  }

  const stopListener = (event) => {
    if (isValidStopEvent() && stopValidator(event)) {
      event.preventDefault();
      event.target.blur();

      onStop();
    }
  }

  const initiateListener = (event) => {
    if (isValidActivationEvent(event) && initiateValidator(event)) {
      event.preventDefault();
      event.target.blur();

      window.removeEventListener(initiateEvent, initiateListener);
      window.removeEventListener(stopEvent, stopListener);

      window.addEventListener(fireEvent, fireListener);
      window.addEventListener(initiateEvent, preventDefaultListener, { passive: false });

      onInitiate();
    }
  };

  const fireListener = (event) => {
    if (releaseValidator(event)) {
      event.preventDefault();
      event.target.blur();

      onFire();

      window.removeEventListener(fireEvent, fireListener);
      window.removeEventListener(initiateEvent, preventDefaultListener);
      window.removeEventListener(stopEvent, preventDefaultListener);

      listenFor(
        initiateEvent,
        fireEvent,
        stopEvent,
        initiateValidator,
        releaseValidator,
        stopValidator,
        onInitiate,
        onFire,
        onStop
      );
    }
  };

  window.addEventListener(initiateEvent, initiateListener, { passive: false });
  window.addEventListener(stopEvent, stopListener, { passive: false });
}

function isValidActivationEvent(event) {
  return (
    Boolean(document.querySelector('[data-activation]')) &&
    !document.querySelector('[data-stop]') &&
    !document.querySelector('[data-modal]') &&
    !event.repeat &&
    !inputElements.includes(String(event.target.tagName).toLowerCase()) &&
    !event.target.closest(inputElements.join(','))
  );
}

function isValidTouchClickEvent(event) {
  return !!event.target.closest('[data-activation]');
}

function isSpacebarEvent(event) {
  return keycode(event.keyCode) === 'space';
}

function isValidStopEvent() {
  return Boolean(document.querySelector('[data-stop]'));
}
