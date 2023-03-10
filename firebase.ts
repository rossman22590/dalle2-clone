import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCU2vr9jkUs6pEQPSN71HfsZ77pB_YLFTo",
  authDomain: "instaclone-2f2b1.firebaseapp.com",
  projectId: "instaclone-2f2b1",
  storageBucket: "instaclone-2f2b1.appspot.com",
  messagingSenderId: "859949651545",
  appId: "1:859949651545:web:f831abdc1af27154468348"
  };

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)
export {db};
