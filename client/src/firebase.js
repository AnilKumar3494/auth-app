// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "authapp-63daf.firebaseapp.com",
    projectId: "authapp-63daf",
    storageBucket: "authapp-63daf.appspot.com",
    messagingSenderId: "815841819080",
    appId: "1:815841819080:web:2c2074b478015683ace8fd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);