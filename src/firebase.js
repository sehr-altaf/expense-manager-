// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgU868Fg9MYOCrBPfPYqD5Z12-C7vv688",
  authDomain: "expenses-manager-fs764.firebaseapp.com",
  projectId: "expenses-manager-fs764",
  storageBucket: "expenses-manager-fs764.firebasestorage.app",
  messagingSenderId: "631234989156",
  appId: "1:631234989156:web:c77412525ff0a90e2a6371",
  measurementId: "G-TNGNGHG4NQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export {db};
