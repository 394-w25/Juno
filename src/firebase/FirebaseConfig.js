import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { browserLocalPersistence, getAuth, GoogleAuthProvider, setPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-2N9oY4OFpZjxf7R20TBIY_69IxDcb0Q",
  authDomain: "juno-154f7.firebaseapp.com",
  projectId: "juno-154f7",
  storageBucket: "juno-154f7.firebasestorage.app",
  messagingSenderId: "440227381721",
  appId: "1:440227381721:web:00e34d8cbde2e5e9b059c8",
  measurementId: "G-ZGTW9VC41X"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();

export {app, googleProvider};