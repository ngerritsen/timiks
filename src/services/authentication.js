import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

export function onRedirectError() {
  return new Observable(observer => {
    firebase
      .auth()
      .getRedirectResult()
      .catch(error => observer.next(error));
  });
}

export function login() {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithRedirect(provider);
}

export function logout() {
  return firebase.auth().signOut();
}

export function onUserChanged() {
  return new Observable(observer => {
    firebase.auth().onAuthStateChanged(user => observer.next(user));
  });
}
