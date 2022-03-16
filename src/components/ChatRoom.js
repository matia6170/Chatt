import React, { useState, useRef} from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

import { useCollectionData } from "react-firebase-hooks/firestore";

import {auth, firebaseApp, db} from "../firebase/firebaseConfig"

import Message from "./Message";

import { useParams } from "react-router-dom";


export default function ChatRoom() {
  const [formValue, setFormValue] = useState("");
  const chatid = useParams();

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
    <div className="container">
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