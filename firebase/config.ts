// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAKrQxR_E6bcZC3_p-fKKELuanCvH21eAs",
    authDomain: "classmanage-7b65c.firebaseapp.com",
    databaseURL: "https://classmanage-7b65c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "classmanage-7b65c",
    storageBucket: "classmanage-7b65c.appspot.com",
    messagingSenderId: "633402335058",
    appId: "1:633402335058:web:6f5c5625d473187002a48b",
    measurementId: "G-KSRKEES5WX"
};

// Initialize Firebase
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;