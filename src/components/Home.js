import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  limit,
  onSnapshot
} from "firebase/firestore";


import { auth, firebaseApp, db } from "../firebase/firebaseConfig";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function Home() {
  const [formValue, setFormValue] = useState("");
  const [tableData, setTableData] = useState([]);

  const chatroomRef = collection(db, "chat");
  const q = query(chatroomRef, orderBy("createdAt"));

  useEffect(()=>{
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
       
        
        const chatList = [];
        querySnapshot.forEach((doc) => {
            chatList.push(doc);
            
        });
        setTableData(chatList);
     
        
      })
    
  },[])
  console.log("table data",tableData);

  const addChatroom = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;

    console.log("submit button pressed");
    try {
      const docRef = await addDoc(collection(db, "chat"), {
        name: formValue,
        createdAt: serverTimestamp(),
        uid,
        photoURL,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    setFormValue("");
  };

  return (
    <div className="container">
      <form onSubmit={addChatroom}>
        <div className="form-group">
          <label htmlFor="chat-name">Chat name</label>
          <input
            type="text"
            className="form-control"
            id="chat-name"
            placeholder="Enter chatname"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-outline-primary">
          Add Chatroom
        </button>
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ChatName</th>
            <th scope="col">Doc ID</th>
          </tr>
        </thead>
        <tbody>
        
        {tableData && tableData.map((room, index) =>(
        <tr key={index}>
            <th scope="row">{index}</th>
            <td>{room.data().name}</td>
            <td>{room.id}</td>
          </tr>
        ))}
       
        </tbody>
      </table>
    </div>
  );
}
