import React from "react";


//props
export default function Message({ text, uid, photoURL }) {
    return (
      <div className="message ">
        <img
          style={{ width: "30px" }}
          src={
            photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
          }
        />
        <p className="lead">{text}</p>
      </div>
    );
  }
  