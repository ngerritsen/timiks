import * as firebase from 'firebase/app';

export function login() {
  const email = 'n.c.gerritsen@gmail.com';
  const actionCodeSettings = {
    url: window.location.origin,
    handleCodeInApp: true
  };

  alert('trying to login with: ' + 'window.location.origin');

  return firebase
    .auth()
    .sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => {
      window.localStorage.setItem('emailForSignIn', email);
    })
    .catch(error => alert(error.message));
}

export function verifyLogin() {
  if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
    const email = window.localStorage.getItem('emailForSignIn');

    if (!email) {
      alert('Invalid login.');
    }

    firebase
      .auth()
      .signInWithEmailLink(email, window.location.href)
      .then(() => {
        window.localStorage.removeItem('emailForSignIn');
      });
  }
}

export function onLoggedIn(callback) {
  firebase.auth().onAuthStateChanged(callback);
}
