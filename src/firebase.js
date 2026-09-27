import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAw_6nK4i93HCeSilqCblqZBGT2v5BXy04",
  authDomain: "signintestproject-bd877.firebaseapp.com",
  projectId: "signintestproject-bd877",
  storageBucket: "signintestproject-bd877.firebasestorage.app",
  messagingSenderId: "1025962211461",
  appId: "1:1025962211461:web:674dd85173a3c69d9c51ec",
  measurementId: "G-66N0ZFB9R3"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);