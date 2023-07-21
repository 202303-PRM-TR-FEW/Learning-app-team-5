// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_REACT_APP_FIERBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_REACT_APP_FIERBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_REACT_APP_FIERBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_REACT_APP_FIERBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_REACT_APP_FIERBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_REACT_APP_FIERBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_REACT_APP_FIERBASE_MEASUREMENT_ID
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);