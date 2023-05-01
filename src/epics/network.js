import { fromEvent, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { networkOnline, networkOffline, showNotification } from "../actions";

export const onlineEpic = () =>
  fromEvent(window, "online").pipe(
    mergeMap(() => of(networkOnline(), showNotification("Application online")))
  );

export const offlineEpic = () =>
  fromEvent(window, "offline").pipe(
    mergeMap(() =>
      of(networkOffline(), showNotification("Application offline"))
    )
  );
