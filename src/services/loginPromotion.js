import { LOGIN_PROMOTED } from "../constants/storage";

export function isLoginPromoted() {
  return !localStorage.getItem(LOGIN_PROMOTED);
}

export function dismissLoginPromotion() {
  localStorage.setItem(LOGIN_PROMOTED, "true");
}
