import { of } from 'rxjs';
import * as loginPromotionService from '../services/loginPromotion';
import { filter, ignoreElements, map, tap } from 'rxjs/operators';
import { promoteLogin } from '../actions';
import { DISMISS_LOGIN_PROMOTION } from '../constants/actionTypes';
import { ofType } from 'redux-observable';

export const loginPromotionEpic = () =>
  of(loginPromotionService.isLoginPromoted()).pipe(filter(Boolean), map(promoteLogin));

export const dismissLoginPromotionEpic = action$ =>
  action$.pipe(
    ofType(DISMISS_LOGIN_PROMOTION),
    tap(loginPromotionService.dismissLoginPromotion),
    ignoreElements()
  );
