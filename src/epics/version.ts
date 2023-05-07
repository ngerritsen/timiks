import { interval, EMPTY } from "rxjs";
import {
  mergeMap,
  catchError,
  map,
  filter,
  take,
  withLatestFrom,
} from "rxjs/operators";
import * as versionService from "../services/version";
import { shouldPromoteLogin } from "../selectors/loginPromotion";
import { POLL_VERSION_INTERVAL } from "../constants/version";
import { newVersionAvailable } from "../slices/version";
import { TimiksEpic } from "../types";

export const newVersionEpic: TimiksEpic = (_, state$) =>
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
    map(() => newVersionAvailable())
  );
