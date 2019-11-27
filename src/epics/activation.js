import { fromEvent, interval, merge, of, timer } from 'rxjs';
import keycode from 'keycode';
import {
  filter,
  withLatestFrom,
  map,
  tap,
  switchMap,
  takeUntil,
  mergeMap,
  ignoreElements
} from 'rxjs/operators';
import {
  getActivationDuration,
  shouldUseInspectionTime,
  shouldUseManualTimeEntry,
  shouldWarnForInspectionTime
} from '../selectors/settings';
import * as actions from '../actions';
import * as timerContants from '../constants/timer';
import { ofType } from 'redux-observable';
import { PREPARE_ACTIVATION, START_INSPECTION, START_TIMER } from '../constants/actionTypes';
import * as activationSelectors from '../selectors/activation';
import { isStopped, isInspecting, getStopTime } from '../selectors/timer';
import { playSound } from '../helpers/audio';

const inputElements = ['input', 'textarea'];

export const initializeActivationEpic = (_, state$) =>
  initiates().pipe(
    withLatestFrom(state$),
    filter(
      ([, state]) =>
        !shouldUseManualTimeEntry(state) &&
        isStopped(state) &&
        Date.now() - getStopTime(state) > timerContants.TIMER_COOLDOWN &&
        !activationSelectors.isPreparing(state)
    ),
    tap(scrollToTop),
    map(([, state]) =>
      shouldUseInspectionTime(state) && !isInspecting(state)
        ? actions.prepareInspection()
        : getActivationDuration(state) === 0
        ? actions.skipPreparationStage()
        : actions.prepareActivation()
    ),
    mergeMap(action => merge(of(action), of(actions.resetTime())))
  );

export const prepareActivationEpic = (action$, state$) =>
  action$.pipe(
    ofType(PREPARE_ACTIVATION),
    withLatestFrom(state$),
    switchMap(([, state]) =>
      interval(getActivationDuration(state) / timerContants.PREPARATION_STAGES).pipe(
        withLatestFrom(state$),
        filter(([, state]) => !activationSelectors.isReady(state)),
        map(actions.incrementPreparationStage),
        takeUntil(fires())
      )
    )
  );

export const warnForInspectionEpic = (action$, state$) =>
  action$.pipe(
    ofType(START_INSPECTION),
    withLatestFrom(state$),
    filter(([, state]) => shouldWarnForInspectionTime(state)),
    mergeMap(() =>
      merge(
        ...timerContants.inspectionTimeWarnings.map(({ time, sound }) =>
          timer(time - timerContants.INSPECTION_TIME_WARNING_OFFSET).pipe(
            tap(() => playSound(sound))
          )
        )
      ).pipe(takeUntil(action$.pipe(ofType(START_TIMER))))
    ),
    ignoreElements()
  );

export const fireInspectionEpic = (action$, state$) =>
  fires().pipe(
    withLatestFrom(state$),
    filter(([, state]) => activationSelectors.isPreparingForInspection(state)),
    tap(([event]) => preventEventSideEffects(event)),
    map(() => actions.startInspection(Date.now()))
  );

export const runInspectionEpic = action$ =>
  action$.pipe(
    ofType(START_INSPECTION),
    switchMap(() =>
      timer(timerContants.INSPECTION_TIME + timerContants.INSPECTION_TIME_PENALTY_TIME).pipe(
        takeUntil(action$.pipe(ofType(START_TIMER)))
      )
    ),
    map(actions.failInspection)
  );

export const fireActivationEpic = (action$, state$) =>
  fires().pipe(
    withLatestFrom(state$),
    filter(([, state]) => activationSelectors.isPreparing(state)),
    tap(([event]) => preventEventSideEffects(event)),
    mergeMap(([, state]) =>
      activationSelectors.isReady(state)
        ? of(actions.resetActivation(), actions.startTimer(Date.now()))
        : of(actions.resetActivation())
    )
  );

export const stopActivationEpic = (_, state$) =>
  stops().pipe(
    withLatestFrom(state$),
    filter(([, state]) => !isStopped(state)),
    tap(([event]) => preventEventSideEffects(event)),
    map(() => actions.stopTimer(Date.now()))
  );

const initiates = () =>
  merge(
    fromEvent(window, 'keydown').pipe(filter(isSpacebarEvent)),
    fromEvent(window, 'touchstart', { passive: false }).pipe(filter(isValidTouchClickEvent)),
    fromEvent(window, 'mousedown').pipe(filter(isValidTouchClickEvent))
  ).pipe(
    tap(preventRepeatEventSideEffects),
    filter(isValidActivationEvent),
    tap(preventEventSideEffects)
  );

const fires = () =>
  merge(
    fromEvent(window, 'keyup').pipe(filter(isSpacebarEvent)),
    fromEvent(window, 'touchend').pipe(filter(isValidTouchClickEvent)),
    fromEvent(window, 'mouseup').pipe(filter(isValidTouchClickEvent))
  );

const stops = () =>
  merge(
    fromEvent(window, 'keydown'),
    fromEvent(window, 'touchstart', { passive: false }),
    fromEvent(window, 'mousedown')
  );

const isValidActivationEvent = event =>
  Boolean(document.querySelector('[data-activation]')) &&
  !document.querySelector('[data-modal]') &&
  !event.repeat &&
  !inputElements.includes(String(event.target.tagName).toLowerCase()) &&
  !event.target.closest(inputElements.join(','));

const preventEventSideEffects = event => {
  event.preventDefault();
  event.target.blur();
};

const preventRepeatEventSideEffects = event => {
  if (event.repeat) {
    event.preventDefault();
  }
};

const isValidTouchClickEvent = event =>
  Boolean(event.target.closest('[data-activation]')) &&
  !event.target.closest('[data-no-activation]') &&
  !(event.type.includes('mouse') && event.button !== 0);

const isSpacebarEvent = event => keycode(event.keyCode) === 'space';
const scrollToTop = () => window.scrollTo(0, 0);
