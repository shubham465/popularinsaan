import React,{useState,useEffect} from 'react'
import {BrowserRouter as Router} from "react-router-dom";
import reducer,{initialState} from "./reducer";
import {StateProvider} from "./StateProvider";
import Votes from "./Votes"

function Result() {
const [roomId,setRoomId]= useState(null);
const [value,setValue]= useState(false);

  useEffect(()=>{
     var a= window.location.href.split("/");
    var b=  a[a.length-1].replace('#','');
      setRoomId(b);
      setValue(true);
    
  },[])

    return (
        <div>
    {value?<div>  <Router>
   
   <StateProvider initialState={initialState}
  reducer={reducer}>
<Votes roomId={roomId}></Votes>
  </StateProvider>
     


  </Router></div> :  <div></div> 
      
       }   </div>
    )
}

export default Result
