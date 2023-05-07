import { Observable, of } from "rxjs";
import { Action } from "redux";
import { filter, ignoreElements, map, tap } from "rxjs/operators";

import * as loginPromotionService from "../services/loginPromotion";
import { promoteLogin } from "../slices/loginPromotion";

export const loginPromotionEpic = () =>
  of(loginPromotionService.isLoginPromoted()).pipe(
    filter(Boolean),
    map(() => promoteLogin())
  );

export const dismissLoginPromotionEpic = (action$: Observable<Action>) =>
  action$.pipe(
    filter(promoteLogin.match),
    tap(loginPromotionService.dismissLoginPromotion),
    ignoreElements()
  );
