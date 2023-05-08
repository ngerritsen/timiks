import { fromEvent, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { goOnline, goOffline } from "../slices/network";
import { showNotification } from "../slices/notifications";

export const onlineEpic = () =>
  fromEvent(window, "online").pipe(
    mergeMap(() =>
      of(goOnline(), showNotification({ message: "Application online" }))
    )
  );

export const offlineEpic = () =>
  fromEvent(window, "offline").pipe(
    mergeMap(() =>
      of(goOffline(), showNotification({ message: "Application offline" }))
    )
  );
