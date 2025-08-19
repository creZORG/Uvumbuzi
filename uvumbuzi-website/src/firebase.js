// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCVeo1oZ3a-G7NYynTzXEtL6TjauzwqO1s",
    authDomain: "uvumbuzi-5e26a.firebaseapp.com",
    projectId: "uvumbuzi-5e26a",
    storageBucket: "uvumbuzi-5e26a.firebasestorage.app",
    messagingSenderId: "936887264927",
    appId: "1:936887264927:web:f6818ce74507aee6f424aa",
    measurementId: "G-86F044BY1R"
};

// Initialize Firebase App and Services
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Note: Analytics may not work in the Canvas environment
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export the services so they can be used in other components
export { auth, db, storage, GoogleAuthProvider, signInWithPopup };