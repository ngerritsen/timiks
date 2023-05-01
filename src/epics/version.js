import { interval, EMPTY } from "rxjs";
import {
  mergeMap,
  catchError,
  map,
  filter,
  take,
  withLatestFrom,
} from "rxjs/operators";
import { newVersionAvailable } from "../actions";
import * as versionService from "../services/version";
import { shouldPromoteLogin } from "../selectors/loginPromotion";
import { POLL_VERSION_INTERVAL } from "../constants/version";

export const newVersionEpic = (_, state$) =>
  interval(POLL_VERSION_INTERVAL).pipe(
    mergeMap(() =>
      versionService.getLatestBuildNumber().pipe(catchError(() => EMPTY))
    ),
    withLatestFrom(state$),
    filter(
      ([buildNumber, state]) =>
        !shouldPromoteLogin(state) &&
        buildNumber > versionService.getCurrentBuildNumber()
    ),
    take(1),
    map(newVersionAvailable)
  );
