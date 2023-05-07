import { timer } from "rxjs";
import { filter, map, switchMap, takeUntil } from "rxjs/operators";
import { NOTIFICATION_DURATION } from "../constants/notifications";
import { showNotification, hideNotification } from "../slices/notifications";
import { TimiksEpic } from "../types";

export const notificationEpic: TimiksEpic = (action$) =>
  action$.pipe(
    filter(showNotification.match),
    switchMap(() =>
      timer(NOTIFICATION_DURATION).pipe(
        takeUntil(action$.pipe(filter(hideNotification.match))),
        map(() => hideNotification())
      )
    )
  );
