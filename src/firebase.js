import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCqvX3ebmI6rQDTrf-Eg6SLcQV3JiW4QfA",
  authDomain: "slack-clone-b8d74.firebaseapp.com",
  projectId: "slack-clone-b8d74",
  storageBucket: "slack-clone-b8d74.appspot.com",
  messagingSenderId: "676338949800",
  appId: "1:676338949800:web:67b1c5c8f7bcda57b7ec9d",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
