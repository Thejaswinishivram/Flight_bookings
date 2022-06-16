// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database"
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBu82fAIxAzb8FU0AzZdlq2RduNOUSBQCI",
  authDomain: "flight-booking-15868.firebaseapp.com",
  databaseURL: "https://flight-booking-15868-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "flight-booking-15868",
  storageBucket: "flight-booking-15868.appspot.com",
  messagingSenderId: "1069129770354",
  appId: "1:1069129770354:web:37969745e8b288013d29eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth=getAuth(app);
export const firebasedatabase=getDatabase(app);