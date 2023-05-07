import { fromEvent, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { networkOnline, networkOffline } from "../actions";
import { showNotification } from "../slices/notifications";

export const onlineEpic = () =>
  fromEvent(window, "online").pipe(
    mergeMap(() =>
      of(networkOnline(), showNotification({ message: "Application online" }))
    )
  );

export const offlineEpic = () =>
  fromEvent(window, "offline").pipe(
    mergeMap(() =>
      of(networkOffline(), showNotification({ message: "Application offline" }))
    )
  );
