import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSifU4A3NDbfgAucZztICVEByt0kN9HE0",
  authDomain: "joblytics-374b5.firebaseapp.com",
  projectId: "joblytics-374b5",
  storageBucket: "joblytics-374b5.firebasestorage.app",
  messagingSenderId: "1086105009315",
  appId: "1:1086105009315:web:56c398a6675ea6d3a91316",
  measurementId: "G-VFEFJQCB2X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
