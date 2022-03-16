import React, { useState, useRef, useEffect } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  limit,
  doc,
  getDoc,
  onSnapshot
} from "firebase/firestore";

import { useCollectionData } from "react-firebase-hooks/firestore";

import { auth, firebaseApp, db } from "../firebase/firebaseConfig";

import Message from "./Message";

export default function ChatRoom(props) {
  const [formValue, setFormValue] = useState("");
  const [docid, setDocid] = useState("");
  const [title,setTitle] = useState("");
  const [messageData,setMessageData]=useState();
  useEffect(() => {
    setDocid(props.docid.id);

    //chatroom data
    const titleRef = doc(db, "chat", props.docid.id);
    getDoc(titleRef).then((doc) =>{
      setTitle(doc.data().name);
      
    });

    let msgRef;
    if (docid.length > 0) {
      msgRef = collection(db, "chat", docid, "messages");
    } else {
      msgRef = collection(db, "chat", "tt", "messages");
    }
  
    const q = query(msgRef, orderBy("createdAt", "desc"), limit(25));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const chatList = [];
      querySnapshot.forEach((doc) => {
        chatList.push(doc.data());
      });
      setMessageData(chatList);
      console.log(chatList)
    });
    
  }, []);
  console.log(docid);
const dummy = useRef();

  useEffect(()=>{
    dummy.current.scrollIntoView({ behavior: "smooth" });
  },[messageData])



  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;

    console.log("submit button pressed");
    try {
      const docRef = await addDoc(collection(db, "chat", docid, "messages"), {
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
    <div >
      <div className="display-4 title">{title}</div>
      <div className="message-box">
        {messageData &&
          messageData
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
