import firebase from "firebase";

const config = {
  apiKey: "AIzaSyAYgxSDuOISBrti_0HkYliR6Gn2gFA1NT8",
  authDomain: "my-notes-app-26ede.firebaseapp.com",
  databaseURL: "https://my-notes-app-26ede.firebaseio.com",
  projectId: "my-notes-app-26ede",
  storageBucket: "my-notes-app-26ede.appspot.com",
  messagingSenderId: "458001141394"
};
firebase.initializeApp(config);
export default firebase;
