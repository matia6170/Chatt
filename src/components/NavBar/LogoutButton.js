import React from "react";
import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { auth, firebaseApp, db } from "../../firebase/firebaseConfig";


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
      <div className="text-center">
        <button type="button" className="btn btn-warning" onClick={logout}>
          Sign Out
        </button>
      </div>
    );
  }