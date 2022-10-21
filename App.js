import React,{useEffect,useState} from 'react';
//import './App.css';
import Login from "./Login";
import {useStateValue} from "./StateProvider";
import User from "./User.js"
import Votes from "./Votes.js"
import db from './firebase';


function App({roomId}) {
const [{user}, dispatch] = useStateValue();


const [hours,setHours]= useState();;
 



// check if the link has expired.
useEffect(() => {
  db.collection('popular').doc(roomId).get().then((doc)=>
 {console.log(roomId)
   let timeleft= doc.data().timestamp.toDate();
   timeleft.setHours(timeleft.getHours()+6);
   let date2= timeleft;
 //     console.log( Math.floor(timeleft / (1000 * 60 * 60 * 24)  ));
   // console.log(Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))  ;
     // console.log(Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60)));
      // console.log(Math.floor((timeleft % (1000 * 60)) / 1000));  
      let date1=new Date();
      let diffInMs =(date2 - date1);
    diffInMs= diffInMs / (1000 * 60 * 60);
//console.log(diffInMs);
if(diffInMs>=0)
      setHours(1);
      else
      setHours(-1);
   
   }  )
  
  
 

}, [])


  return (
    <div  >
   {!user ? (
     <div >
       <Login/>
       </div>
    ):(
    <div >

{ hours>=0 ? <User roomId={roomId} uid={user.uid} userName={user.displayName} photoURL={user.photoURL}/> : <Votes roomId={roomId}/>
}
{ /*{ getDifferenceInHours(date1, date2)>=0 ?   <Votes/>:
 <User uid={user.uid} userName={user.displayName} photosrc={user.photoURL}  />
} */   }

    </div>
       
        
   )}


    </div>

  
  );
}

export default App;
