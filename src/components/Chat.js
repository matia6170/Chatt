import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getApp } from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFunctions, connectFunctionsEmulator, httpsCallable  } from "firebase/functions";

import ChatRoom from "./ChatRoom";
import { auth, firebaseApp, db } from "../firebase/firebaseConfig";

import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";



const functions = getFunctions(getApp());
connectFunctionsEmulator(functions, "localhost", 5001);
const addMessage = httpsCallable(functions, 'addMessage')

export default function Chat() {
  const [user] = useAuthState(auth);
  const docid = useParams();


  return (
    <div className="App ">
      
      
      {user ? <ChatRoom docid={docid} /> : <h1 className="text-center display-1">You must login!</h1>}
    </div>
  );
}




