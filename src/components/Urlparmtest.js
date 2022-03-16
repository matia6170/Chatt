import React from "react";
import { useParams } from "react-router-dom";

export default function Urlparmtest(){
    const docid = useParams();
    console.log(docid)
    return(<div>
       yayaya
    </div>)
}