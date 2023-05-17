import { Observable } from "rxjs";
import {
  getAuth,
  GoogleAuthProvider,
  getRedirectResult,
  signInWithRedirect,
  User,
} from "firebase/auth";
import app from "../firebase";

const auth = getAuth(app);

export function onRedirectError() {
  return new Observable((observer) => {
    getRedirectResult(auth).catch((error) => observer.next(error));
  });
}

export function login() {
  signInWithRedirect(auth, new GoogleAuthProvider());
}

export function logout() {
  return auth.signOut();
}

export function onUserChanged(): Observable<User> {
  return new Observable((observer) => {
    auth.onAuthStateChanged((user) => observer.next(user));
  });
}
