import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

/**
 * 💡 ACTION REQUIRED:
 * Replace the config below with your actual Firebase project settings!
 * You can find these in the Firebase Console:
 * Project Settings > General > Your Apps > Web (the </> icon)
 */
const firebaseConfig = {
  apiKey: "AIzaSyAs0d6O0wYV5jkaBgx1-yxu_Osbz0_w-IY",
  authDomain: "chatbototp-fd2d3.firebaseapp.com",
  projectId: "chatbototp-fd2d3",
  storageBucket: "chatbototp-fd2d3.firebasestorage.app",
  messagingSenderId: "977087401239",
  appId: "1:977087401239:web:1297a8674ed178fe063b52",
  measurementId: "G-98BHPGGT6X"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
