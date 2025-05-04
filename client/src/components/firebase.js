// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsK1Bed7dKs6hlkfbBppSR61fZBWI2YC8",
  authDomain: "login-ecommerce-66aa6.firebaseapp.com",
  projectId: "login-ecommerce-66aa6",
  storageBucket: "login-ecommerce-66aa6.firebasestorage.app",
  messagingSenderId: "439202513705",
  appId: "1:439202513705:web:2e24e2c9db41be4a32ed38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db= getFirestore(app)
export default app