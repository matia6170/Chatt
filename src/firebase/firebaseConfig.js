import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDStD819xtHnxO5R8s6ioWln-bZV3DDeK8",
  authDomain: "superchat-10573.firebaseapp.com",
  projectId: "superchat-10573",
  storageBucket: "superchat-10573.appspot.com",
  messagingSenderId: "674009775216",
  appId: "1:674009775216:web:2781e3fc30d808fe9f08b5",
  measurementId: "G-V6QG9WDLSY",
});

const auth = getAuth(firebaseApp);
const db = getFirestore();

export {auth,db,firebaseApp}
