// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzjhsDvJsdzPUxDSio-UHkJyCalHPt4MM",
  authDomain: "tech-store-23.firebaseapp.com",
  projectId: "tech-store-23",
  storageBucket: "tech-store-23.appspot.com",
  messagingSenderId: "366354046864",
  appId: "1:366354046864:web:332c3c6acb9b720cda9d15",
  measurementId: "G-NMCYDH4F7W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


