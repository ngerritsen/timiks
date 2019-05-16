import * as firebase from 'firebase/app';

export function login() {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithRedirect(provider);
}

export function logout() {
  return firebase.auth().signOut();
}

export function onLoggedIn(callback) {
  firebase.auth().onAuthStateChanged(callback);
}
