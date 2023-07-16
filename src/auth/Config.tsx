import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import "firebase/database";
import "firebase/storage";

export const firebaseConfig = {
  <--- Firebase Dates --->
};

export const authConfig = firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore(authConfig);
export const storage = firebase.storage(authConfig);
export const auth = firebase.auth();
