import { interval } from 'rxjs';
import {
  mergeMap,
  catchError,
  map,
  ignoreElements,
  filter,
  take,
  withLatestFrom
} from 'rxjs/operators';
import { newVersionAvailable } from '../actions';
import * as versionService from '../services/version';
import { shouldPromoteLogin } from '../selectors/loginPromotion';
import { POLL_VERSION_INTERVAL } from '../constants/app';

export const newVersionEpic = (_, state$) =>
  interval(POLL_VERSION_INTERVAL).pipe(
    mergeMap(() => versionService.getLatestBuildNumber().pipe(catchError(ignoreElements()))),
    withLatestFrom(state$),
    filter(
      ([buildNumber, state]) =>
        !shouldPromoteLogin(state) && buildNumber > versionService.getCurrentBuildNumber()
    ),
    take(1),
    map(newVersionAvailable)
  );
