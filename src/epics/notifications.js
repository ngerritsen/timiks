import { ofType } from "redux-observable";
import { map, switchMap, takeUntil } from "rxjs/operators";
import { HIDE_NOTIFICATION, SHOW_NOTIFICATION } from "../constants/actionTypes";
import { NOTIFICATION_DURATION } from "../constants/notifications";
import { hideNotification } from "../actions";
import { timer } from "rxjs";

export const notificationEpic = (action$) =>
  action$.pipe(
    ofType(SHOW_NOTIFICATION),
    switchMap(() =>
      timer(NOTIFICATION_DURATION).pipe(
        takeUntil(action$.pipe(ofType(HIDE_NOTIFICATION))),
        map(hideNotification)
      )
    )
  );
