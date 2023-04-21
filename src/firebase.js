// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRmK1eX7wRrasUWoi-v_ygZp4soaYZUms",
  authDomain: "macros-app-5dbff.firebaseapp.com",
  projectId: "macros-app-5dbff",
  storageBucket: "macros-app-5dbff.appspot.com",
  messagingSenderId: "164750644943",
  appId: "1:164750644943:web:802e7e991d54ae1e8e89ba"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);