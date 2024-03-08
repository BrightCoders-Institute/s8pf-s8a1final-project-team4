import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA6IPqf79-Fh78udD8qoMeeXq_te558pKs",
  authDomain: "fbank-2e320.firebaseapp.com",
  projectId: "fbank-2e320",
  storageBucket: "fbank-2e320.appspot.com",
  messagingSenderId: "665755295591",
  appId: "1:665755295591:web:21e84ec4f48975bd8d59c2",
  measurementId: "G-KDTV510MDV"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

