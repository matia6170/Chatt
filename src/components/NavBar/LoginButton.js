import React from "react";
import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { auth, firebaseApp, db } from "../../firebase/firebaseConfig";

export default function SignIn() {
    const signInWithGoogle = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider);
  
      

    };
    return (
      <div className="text-center">
        <button
          type="button"
          className="btn btn-primary"
          onClick={signInWithGoogle}
        >
          Sign in
        </button>
      </div>
    );
  }