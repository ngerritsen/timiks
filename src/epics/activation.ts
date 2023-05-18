import keycode from "keycode";
import { fromEvent, interval, merge, of, timer } from "rxjs";
import {
  filter,
  withLatestFrom,
  map,
  tap,
  switchMap,
  takeUntil,
  mergeMap,
  ignoreElements,
} from "rxjs/operators";

import {
  getActivationDuration,
  shouldUseInspectionTime,
  shouldUseManualTimeEntry,
  shouldWarnForInspectionTime,
} from "../selectors/settings";

import * as timerContants from "../constants/timer";
import { playSound } from "../helpers/audio";
import { TimiksEpic } from "../types";

import {
  prepareInspection,
  skipPreparationStage,
  prepareActivation,
  incrementPreparationState,
  resetActivation,
  startInspection,
  resetTime,
  startTimer,
  failInspection,
  stopTimer,
} from "../slices/timer";

import {
  getStopTime,
  isInspecting,
  isPreparing,
  isPreparingForInspection,
  isReady,
  isStopped,
} from "../selectors/timer";

const inputElements = ["input", "textarea"];

export const initializeActivationEpic: TimiksEpic = (_, state$) =>
  initiates().pipe(
    withLatestFrom(state$),
    filter(
      ([, state]) =>
        !shouldUseManualTimeEntry(state) &&
        isStopped(state) &&
        Date.now() - getStopTime(state) > timerContants.TIMER_COOLDOWN &&
        !isPreparing(state)
    ),
    tap(scrollToTop),
    map(([, state]) =>
      shouldUseInspectionTime(state) && !isInspecting(state)
        ? prepareInspection()
        : getActivationDuration(state) === 0
        ? skipPreparationStage()
        : prepareActivation()
    ),
    mergeMap((action) => merge(of(action), of(resetTime())))
  );

export const prepareActivationEpic: TimiksEpic = (action$, state$) =>
  action$.pipe(
    filter(prepareActivation.match),
    withLatestFrom(state$),
    switchMap(([, state]) =>
      interval(
        getActivationDuration(state) / timerContants.PREPARATION_STAGES
      ).pipe(
        withLatestFrom(state$),
        filter(([, state]) => !isReady(state)),
        map(() => incrementPreparationState()),
        takeUntil(action$.pipe(filter(resetActivation.match)))
      )
    )
  );

export const warnForInspectionEpic: TimiksEpic = (action$, state$) =>
  action$.pipe(
    filter(startInspection.match),
    withLatestFrom(state$),
    filter(([, state]) => shouldWarnForInspectionTime(state)),
    mergeMap(() =>
      merge(
        ...timerContants.inspectionTimeWarnings.map(({ time, sound }) =>
          timer(time - timerContants.INSPECTION_TIME_WARNING_OFFSET).pipe(
            tap(() => playSound(sound))
          )
        )
      ).pipe(takeUntil(action$.pipe(filter(startTimer.match))))
    ),
    ignoreElements()
  );

export const fireInspectionEpic: TimiksEpic = (_, state$) =>
  fires().pipe(
    withLatestFrom(state$),
    filter(([, state]) => isPreparingForInspection(state)),
    tap(([event]) => preventEventSideEffects(event)),
    map(() => startInspection(Date.now()))
  );

export const runInspectionEpic: TimiksEpic = (action$) =>
  action$.pipe(
    filter(startInspection.match),
    switchMap(() =>
      timer(
        timerContants.INSPECTION_TIME +
          timerContants.INSPECTION_TIME_PENALTY_TIME
      ).pipe(takeUntil(action$.pipe(filter(startTimer.match))))
    ),
    map(() => failInspection())
  );

export const fireActivationEpic: TimiksEpic = (_, state$) =>
  fires().pipe(
    withLatestFrom(state$),
    filter(([, state]) => isPreparing(state)),
    tap(([event]) => preventEventSideEffects(event)),
    mergeMap(([, state]) =>
      isReady(state)
        ? of(resetActivation(), startTimer(Date.now()))
        : of(resetActivation())
    )
  );

export const stopActivationEpic: TimiksEpic = (_, state$) =>
  stops().pipe(
    withLatestFrom(state$),
    filter(([, state]) => !isStopped(state)),
    tap(([event]) => preventEventSideEffects(event)),
    map(() => stopTimer(Date.now()))
  );

const initiates = () =>
  merge(
    fromEvent(window, "keydown").pipe(filter(isSpacebarEvent)),
    fromEvent(window, "touchstart", { passive: false }).pipe(
      filter(isValidTouchClickEvent)
    ),
    fromEvent(window, "mousedown").pipe(filter(isValidTouchClickEvent))
  ).pipe(
    tap(preventRepeatEventSideEffects),
    filter(isValidActivationEvent),
    tap(preventEventSideEffects)
  );

const fires = () =>
  merge(
    fromEvent(window, "keyup").pipe(filter(isSpacebarEvent)),
    fromEvent(window, "touchend").pipe(filter(isValidTouchClickEvent)),
    fromEvent(window, "mouseup").pipe(filter(isValidTouchClickEvent))
  );

const stops = () =>
  merge(
    fromEvent(window, "keydown"),
    fromEvent(window, "touchstart", { passive: false }),
    fromEvent(window, "mousedown")
  );

const isValidActivationEvent = (event: Event) =>
  Boolean(document.querySelector("[data-activation]")) &&
  !document.querySelector("[data-modal]") &&
  !(event as KeyboardEvent).repeat &&
  !inputElements.includes(
    String((event.target as HTMLElement).tagName).toLowerCase()
  ) &&
  !(event.target as Element).closest(inputElements.join(","));

const preventEventSideEffects = (event: Event) => {
  event.preventDefault();
  (event.target as HTMLElement).blur();
};

const preventRepeatEventSideEffects = (event: Event) => {
  if ((event as KeyboardEvent).repeat) {
    event.preventDefault();
  }
};

const isValidTouchClickEvent = (event: Event) =>
  Boolean((event.target as Element).closest("[data-activation]")) &&
  !(event.target as Element).closest("[data-no-activation]") &&
  !(event.type.includes("mouse") && (event as MouseEvent).button !== 0);

const isSpacebarEvent = (event: Event) => keycode.isEventKey(event, "space");

const scrollToTop = () => window.scrollTo(0, 0);
