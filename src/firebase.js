
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {

  apiKey: "APIKEY",
  authDomain: "AUTHDOMAIN",
  databaseURL: "URL",
  projectId: "PROJECTID",
  storageBucket: "STORAGEBUCKET",
  messagingSenderId: "MESSAGINGSENDERID",
  appId: "APPID"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const reference to firestore
export const db = getFirestore(app)