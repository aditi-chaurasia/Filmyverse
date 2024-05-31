// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-4S2nsUz1wDDNXyKzfhS5zIZXNYZ6vEc",
  authDomain: "aditi-chaurasia.firebaseapp.com",
  projectId: "aditi-chaurasia",
  storageBucket: "aditi-chaurasia.appspot.com",
  messagingSenderId: "1054272534353",
  appId: "1:1054272534353:web:2c53f8c331fcbfd9e90570",
  measurementId: "G-HVDZM1EYKQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
