// firebase/config.js
import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBTdXmZ7nPz5YWt8tHeSKfzC0JDR7g4Wvg",
  authDomain: "gamificationstudy-8fa1e.firebaseapp.com",
  databaseURL: "https://gamificationstudy-8fa1e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gamificationstudy-8fa1e",
  storageBucket: "gamificationstudy-8fa1e.firebasestorage.app",
  messagingSenderId: "290612216113",
  appId: "1:290612216113:web:02addb03beefb04ba5f010"
};

// Initialize Firebase app once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
