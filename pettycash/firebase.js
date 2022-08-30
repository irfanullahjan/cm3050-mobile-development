import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCB6iQ-MafoYe2tokwJJ_nHjXUkqD5XOCU",
  authDomain: "pettycash-21cf1.firebaseapp.com",
  projectId: "pettycash-21cf1",
  storageBucket: "pettycash-21cf1.appspot.com",
  messagingSenderId: "227782853300",
  appId: "1:227782853300:web:34f4cae23d5a5237d28de1"
};

// Initialize Firebase
let app;
let auth;
let firestore;
if (getApps().length < 1) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
  firestore = getFirestore(app);
} else {
  app = getApp();
  auth = getAuth();
  firestore = getFirestore();
}

export { app, auth, firestore };
