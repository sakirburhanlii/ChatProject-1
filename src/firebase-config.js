// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAg8lPgYUjFcmfvcdPi9w4rgosuoN_b1f8",
  authDomain: "chatproject-bdd1e.firebaseapp.com",
  projectId: "chatproject-bdd1e",
  storageBucket: "chatproject-bdd1e.appspot.com",
  messagingSenderId: "665501353527",
  appId: "1:665501353527:web:620307627da8b0e97221b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)