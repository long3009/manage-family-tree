// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC967fzyajfDUOgU_eGhmRECy_UMyPpRYA",
  authDomain: "family-tree-65a3c.firebaseapp.com",
  projectId: "family-tree-65a3c",
  storageBucket: "family-tree-65a3c.appspot.com",
  messagingSenderId: "630587776892",
  appId: "1:630587776892:web:27d876012cf6ae246bcef9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
