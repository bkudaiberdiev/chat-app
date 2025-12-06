// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8TNvS-eyFIsgw6fyTCDFT--BxRmeIvds",
  authDomain: "sibers-9840b.firebaseapp.com",
  projectId: "sibers-9840b",
  storageBucket: "sibers-9840b.firebasestorage.app",
  messagingSenderId: "474425039932",
  appId: "1:474425039932:web:fbd0a8626f4d8cdce3f739"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);