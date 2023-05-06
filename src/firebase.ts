import { initializeApp } from "firebase/app";
import { initializeFirestore, persistentLocalCache } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUu8vGS4Lp0hGXqeh-Elct0WeNT8eqrYI",
  authDomain: "timiks-1fc10.firebaseapp.com",
  databaseURL: "https://timiks-1fc10.firebaseio.com",
  projectId: "timiks-1fc10",
  storageBucket: "timiks-1fc10.appspot.com",
  messagingSenderId: "562902872449",
  appId: "1:562902872449:web:e76746cb3b1cd51b",
};

const app = initializeApp(firebaseConfig);

initializeFirestore(app, {
  localCache: persistentLocalCache(),
});

export default app;
