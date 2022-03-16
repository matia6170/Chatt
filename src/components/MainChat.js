import React, { useState, useRef, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

import { getApp } from "firebase/app";

import { useAuthState } from "react-firebase-hooks/auth";

import ChatRoom from "./ChatRoom";
import { auth, firebaseApp, db } from "../firebase/firebaseConfig";

import { getFunctions, connectFunctionsEmulator, httpsCallable  } from "firebase/functions";

const functions = getFunctions(getApp());
connectFunctionsEmulator(functions, "localhost", 5001);
const addMessage = httpsCallable(functions, 'addMessage')

export default function MainChat() {
  const [user] = useAuthState(auth);

  return (
    <div className="App ">
      <div className="display-4 title">Test Chat</div>
      
      {user ? <ChatRoom /> : null}
    </div>
  );
}




