// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "myauthapp-ba9d6.firebaseapp.com",
    projectId: "myauthapp-ba9d6",
    storageBucket: "myauthapp-ba9d6.appspot.com",
    messagingSenderId: "301251886678",
    appId: "1:301251886678:web:536100ab75338420c645f7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);