// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-c4554.firebaseapp.com",
  projectId: "mern-estate-c4554",
  storageBucket: "mern-estate-c4554.appspot.com",
  messagingSenderId: "605342809531",
  appId: "1:605342809531:web:60f30881006a1339acd89e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
