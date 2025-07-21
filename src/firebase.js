// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getDatabase } from "firebase/database"; 
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcqV9jeZHVKO9ue9lK6v60vR-dLDczJnk",
  authDomain: "logincreateform-7244d.firebaseapp.com",
  databaseURL: "https://logincreateform-7244d-default-rtdb.firebaseio.com",
  projectId: "logincreateform-7244d",
  storageBucket: "logincreateform-7244d.appspot.com",
  messagingSenderId: "641249161255",
  appId: "1:641249161255:web:b9f70c40d2187d7d225e02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);

export const auth=getAuth(app);

export const db = getFirestore(app);
export default app;