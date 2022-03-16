import React from "react";
import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { auth, firebaseApp, db } from "../../firebase/firebaseConfig";

import { Nav } from "react-bootstrap";

export default function SignOut() {
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
      <Nav.Link onClick={logout} >Log Out</Nav.Link>
    );
  }