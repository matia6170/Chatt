import React, { useState, useRef, useEffect} from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  limit,
  doc,
  onSnapshot,
} from "firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { type } from "@testing-library/user-event/dist/type";

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

export default function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App container">
      <div className="display-4 title">Test Chat</div>
      <SignOut />
      {user ? <ChatRoom /> : <SignIn />}
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };
  return (
    <div className="text-center">
      <button
        type="button"
        className="btn btn-primary"
        onClick={signInWithGoogle}
      >
        Sign in
      </button>
    </div>
  );
}

function SignOut() {
  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Signout succesful");
      })
      .catch((error) => {
        // An error happened.
        console.log("error occured");
      });
  };

  return (
    <div className="text-center"> 
      <button type="button" className="btn btn-warning" onClick={logout}>
        Sign Out
      </button>
    </div>
  );
}

function ChatRoom() {
  const [formValue, setFormValue] = useState("");

  const dummy = useRef();

  const msgRef = collection(db, "messages");
  const q = query(msgRef, orderBy("createdAt", "desc"), limit(25));
  const [messages] = useCollectionData(q, { idField: "id" });

  console.log(typeof messages);

  console.log(messages);

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;

    console.log("submit button pressed");
    try {
      const docRef = await addDoc(collection(db, "messages"), {
        text: formValue,
        createdAt: serverTimestamp(),
        uid,
        photoURL,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className="message-box">
        {messages &&
          messages
            .slice(0)
            .reverse()
            .map((msg) => (
              <Message
                text={msg.text}
                uid={msg.uid}
                photoURL={msg.photoURL}
                key={msg.createdAt}
              ></Message>
            ))}
        <span ref={dummy}></span>
      </div>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
        />

        <button type="submit" disabled={!formValue}>
          🕊️
        </button>
      </form>
    </div>
  );
}

function Message({ text, uid, photoURL }) {
  return (
    <div className="message ">
      <img
        style={{ width: "30px" }}
        src={
          photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
        }
      />
      <p className="lead">{text}</p>
    </div>
  );
}
