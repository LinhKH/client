// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-53144.firebaseapp.com",
  projectId: "mern-estate-53144",
  storageBucket: "mern-estate-53144.firebasestorage.app",
  messagingSenderId: "162043021646",
  appId: "1:162043021646:web:d7ff6ebf13b84e8df0f61f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);