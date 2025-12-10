import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDCN1mgetTulPZMlK4zTMru7reIuYAZFjI",
  authDomain: "thinkboard-67d5c.firebaseapp.com",
  projectId: "thinkboard-67d5c",
  storageBucket: "thinkboard-67d5c.firebasestorage.app",
  messagingSenderId: "192408559731",
  appId: "1:192408559731:web:d96525bbd4eb69fc9e4a06",
  measurementId: "G-C4V83E96DP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// İSTEĞE BAĞLI: Analytics kaldırıldı (sorun yaratmaması için)
const auth = getAuth(app);
export const db = getFirestore(app);
export { auth };
