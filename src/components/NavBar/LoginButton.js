import React from "react";
import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { auth, firebaseApp, db } from "../../firebase/firebaseConfig";
import { Nav } from "react-bootstrap";

export default function SignIn() {
    const signInWithGoogle = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider);
  
      

    };
    return (
      <Nav.Link onClick={signInWithGoogle} >Sign in using Google</Nav.Link>
      
    );
  }