import React,{useState,useEffect} from 'react'
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import reducer,{initialState} from "./reducer";
import {StateProvider} from "./StateProvider";
//import Votes from "./Votes"

function Apps() {
const [roomId,setRoomId]= useState(null);
const [value,setValue]= useState(false);

  useEffect(()=>{
     var a= window.location.href.split("/");
    var b=  a[a.length-1].replace('#','');
     console.log(b)
      setRoomId(b);
      setValue(true);
    
  },[])

    return (
        <div>
    {value?<div>  <Router>
   
   <StateProvider initialState={initialState}
  reducer={reducer}>
<App roomId={roomId}></App>
  </StateProvider>
     


  </Router></div> :  <div></div> 
      
       }   </div>
    )
}

export default Apps
