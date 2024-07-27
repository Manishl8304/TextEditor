import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMRE9LJEMpXnQWk28xkqO7zJAjl5-gXWE",
  authDomain: "notesapp-250dd.firebaseapp.com",
  projectId: "notesapp-250dd",
  storageBucket: "notesapp-250dd.appspot.com",
  messagingSenderId: "244716354680",
  appId: "1:244716354680:web:ca3a1c624255c8b475018d",
  measurementId: "G-SX2X9G03NR"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const notesCollection = collection(db,'notes')