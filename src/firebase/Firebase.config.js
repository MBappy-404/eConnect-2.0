// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: process.env.REACT_APP_apiKey,
  // authDomain: process.env.REACT_APP_authDomain,
  // projectId: process.env.REACT_APP_projectId,
  // storageBucket: process.env.REACT_APP_storageBucket,
  // messagingSenderId: process.env.REACT_APP_messagingSenderId,
  // appId:  process.env.REACT_APP_appId,

  apiKey: "AIzaSyD3RNBkrABh6Soq3DJlxVX2Rp-yssFIBss",
  authDomain: "econnect-a64f7.firebaseapp.com",
  projectId: "econnect-a64f7",
  storageBucket: "econnect-a64f7.appspot.com",
  messagingSenderId: "274633250458",
  appId: "1:274633250458:web:82f1f6d4773669e03e7123"


};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;