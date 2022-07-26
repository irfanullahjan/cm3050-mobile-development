import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCB6iQ-MafoYe2tokwJJ_nHjXUkqD5XOCU",
  authDomain: "pettycash-21cf1.firebaseapp.com",
  projectId: "pettycash-21cf1",
  storageBucket: "pettycash-21cf1.appspot.com",
  messagingSenderId: "227782853300",
  appId: "1:227782853300:web:34f4cae23d5a5237d28de1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export { firebase };