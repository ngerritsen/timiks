import { Observable } from "rxjs";
import { ajax } from "rxjs/ajax";

export function getLatestBuildNumber(): Observable<number> {
  return ajax.getJSON(window.location.origin + "/build.json");
}

export function getCurrentBuildNumber() {
  return Number(
    window.document
      .querySelector("[data-build-number]")
      .getAttribute("data-build-number")
  );
}
