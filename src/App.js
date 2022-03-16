import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar"
import Urlparmtest from "./components/Urlparmtest";

import MainChat from "./components/MainChat";
import Home from "./components/Home";

/* const functions = getFunctions(getApp());
connectFunctionsEmulator(functions, "localhost", 5001);
const addMessage = httpsCallable(functions, 'addMessage')
 */
export default function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        
        <Route path="/" element={<Home/>}/>
        <Route path="messages" element={<Urlparmtest/>} >
          <Route path=":id" element={<Urlparmtest/>}/>
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}
