// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAR4JfLgTiIr0yO0AZ57KgI5OQiFJL-pbs",
  authDomain: "ticketmovieapp-8712b.firebaseapp.com",
  projectId: "ticketmovieapp-8712b",
  storageBucket: "ticketmovieapp-8712b.firebasestorage.app",
  messagingSenderId: "475978507263",
  appId: "1:475978507263:web:f0c7c4c1cbc2e1ae10fdca",
  measurementId: "G-K3KY7WVJSZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);