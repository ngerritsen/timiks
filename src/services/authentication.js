import * as firebase from 'firebase/app';

firebase
  .auth()
  .getRedirectResult()
  .then(function(result) {
    if (result.credential) {
      alert(result.credential.accessToken);
    }
  });

export function login(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

export function logout() {
  return firebase.auth().signOut();
}

export function signUp(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

export function onLoggedIn(callback) {
  firebase.auth().onAuthStateChanged(callback);
}
