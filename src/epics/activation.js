import { fromEvent, interval, merge, of, timer } from 'rxjs';
import keycode from 'keycode';
import { filter, withLatestFrom, map, tap, switchMap, takeUntil, mergeMap } from 'rxjs/operators';
import {
  getActivationDuration,
  shouldUseInspectionTime,
  shouldUseManualTimeEntry
} from '../selectors/settings';
import * as actions from '../actions';
import { INSPECTION_TIME, PREPARATION_STAGES, TIMER_COOLDOWN } from '../constants/app';
import { ofType } from 'redux-observable';
import { PREPARE_ACTIVATION, START_INSPECTION, START_TIMER } from '../constants/actionTypes';
import * as activationSelectors from '../selectors/activation';
import { isStopped, isInspecting, getStopTime } from '../selectors/timer';

const inputElements = ['input', 'textarea'];

export const initializeActivationEpic = (_, state$) =>
  initiates().pipe(
    withLatestFrom(state$),
    filter(
      ([, state]) =>
        !shouldUseManualTimeEntry(state) &&
        isStopped(state) &&
        Date.now() - getStopTime(state) > TIMER_COOLDOWN &&
        !activationSelectors.isPreparing(state)
    ),
    tap(scrollToTop),
    map(([, state]) =>
      shouldUseInspectionTime(state) && !isInspecting(state)
        ? actions.prepareInspection()
        : getActivationDuration(state) === 0
        ? actions.skipPreparationStage()
        : actions.prepareActivation()
    )
  );

export const prepareActivationEpic = (action$, state$) =>
  action$.pipe(
    ofType(PREPARE_ACTIVATION),
    withLatestFrom(state$),
    switchMap(([, state]) =>
      interval(getActivationDuration(state) / PREPARATION_STAGES).pipe(
        withLatestFrom(state$),
        filter(([, state]) => !activationSelectors.isReady(state)),
        map(actions.incrementPreparationStage),
        takeUntil(fires())
      )
    )
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
    switchMap(() => timer(INSPECTION_TIME).pipe(takeUntil(action$.pipe(ofType(START_TIMER))))),
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

export const stopActivationEpic = (action$, state$) =>
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
    tap(preventEventSideEffects),
    filter(isValidActivationEvent)
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
  ).pipe(filter(isValidStopEvent));

const isValidActivationEvent = event =>
  Boolean(document.querySelector('[data-activation]')) &&
  !document.querySelector('[data-stop]') &&
  !document.querySelector('[data-modal]') &&
  !event.repeat &&
  !inputElements.includes(String(event.target.tagName).toLowerCase()) &&
  !event.target.closest(inputElements.join(','));

const preventEventSideEffects = event => {
  event.preventDefault();
  event.target.blur();
};
const isValidTouchClickEvent = event => Boolean(event.target.closest('[data-activation]'));
const isSpacebarEvent = event => keycode(event.keyCode) === 'space';
const isValidStopEvent = () => Boolean(document.querySelector('[data-stop]'));
const scrollToTop = () => window.scrollTo(0, 0);
