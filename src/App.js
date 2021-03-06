import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavBar/NavigationBar"
import Urlparmtest from "./components/Urlparmtest";


import Chat from "./components/Chat";
import Home from "./components/Home";




/* const functions = getFunctions(getApp());
connectFunctionsEmulator(functions, "localhost", 5001);
const addMessage = httpsCallable(functions, 'addMessage')
 */
export default function App() {

  
  return (
    <BrowserRouter>
      <NavigationBar/>
      <Routes>
        
        <Route path="/" element={<Home/>}/>
        <Route path="messages" element={<Chat/>} >
          <Route path=":id" element={<Chat/>}/>
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}
