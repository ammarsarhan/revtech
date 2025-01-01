// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgN25NplpEe1jRLPGjNr-MfPa2XVKnVKk",
  authDomain: "revtech-4039c.firebaseapp.com",
  projectId: "revtech-4039c",
  storageBucket: "revtech-4039c.firebasestorage.app",
  messagingSenderId: "184858478605",
  appId: "1:184858478605:web:939eca2c29288ffd822d44",
  measurementId: "G-CQLR1PVXTE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);