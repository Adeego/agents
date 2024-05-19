// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCUm38tHJ8HBWCYS3YpjjaKLjFgARTxdFc",
  authDomain: "adeego-6d3be.firebaseapp.com",
  projectId: "adeego-6d3be",
  storageBucket: "adeego-6d3be.appspot.com",
  messagingSenderId: "1038474343982",
  appId: "1:1038474343982:web:8f068b428737ebf06951bf",
  measurementId: "G-21WJK467DS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const messaging = getMessaging(app);

export default app;
