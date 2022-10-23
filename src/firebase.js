// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAED7TEbFMDb6oJFgDSkLmljP5Fd07wjUw",
  authDomain: "doshisha-m1.firebaseapp.com",
  projectId: "doshisha-m1",
  storageBucket: "doshisha-m1.appspot.com",
  messagingSenderId: "1066884381069",
  appId: "1:1066884381069:web:b1db26bf2b9e84737ee5c4",
  measurementId: "G-BZTB3GBKMH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);