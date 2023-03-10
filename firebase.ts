import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClPDV8a2aCeD_CQ35M61TC2fkVh08o8rQ",
  authDomain: "dalle-db5f5.firebaseapp.com",
  projectId: "dalle-db5f5",
  storageBucket: "dalle-db5f5.appspot.com",
  messagingSenderId: "956559469362",
  appId: "1:956559469362:web:116df0fff92d01bd3e852b",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)
export {db};
