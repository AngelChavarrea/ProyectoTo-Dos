// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCowX3A8wpLzQfAquLhyOnK0nRKKh1FyDM",
  authDomain: "to-do-new-6da69.firebaseapp.com",
  projectId: "to-do-new-6da69",
  storageBucket: "to-do-new-6da69.appspot.com",
  messagingSenderId: "33875277541",
  appId: "1:33875277541:web:d3bf049b94bc83cc97060c",
  measurementId: "G-2X6TV2WZ0X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
