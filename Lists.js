import React,{useEffect,useState} from 'react'
import {actionTypes} from "./reducer";
import db  from "./firebase";
import { useStateValue } from './StateProvider';




  
function Lists({roomId}) {
    const [user,setUser] = useState()
    const [{participants}, dispatch] = useStateValue();

  
   
    useEffect(() => {
        async function fetch(){
        
        const resp =  db.collection("popular").doc(roomId);
        const doc = await resp.get()
          dispatch({
            type: actionTypes.fetchdata,
         participants: doc.data()
          })
       
        }
        fetch()
      }, [])

     console.log(user)
    

 
  
    return (
        <div>
        
       
    
    
        </div>
    )
}

export default Lists
