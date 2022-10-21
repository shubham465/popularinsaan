import React, {useState, useEffect } from 'react'
import Apps from "./Apps.js";
import Result from './Result.js';
import Home from './Home.js';

function Route() {
const [value, setValue]= useState(null);

useEffect(()=>{
    console.log(value);

    if((window.location.pathname+"") ===  "/" || (window.location.pathname+"")  === ""
     || (window.location.pathname+"")  === "/popular-insaan" ||  (window.location.pathname+"")  === "/popular-insan" || 
      (window.location.pathname+"")  === "/popular" || (window.location.pathname+"")  === "/facemash"  || 
      (window.location.pathname+"")  === "/techy-hit-tools" || (window.location.pathname+"")  === "/gb-mrpopular" || 
       (window.location.pathname+"")  === "/gb-mrpopular-net" || 
      (window.location.pathname+"")  === "/mrpopular-net" || (window.location.pathname+"")  === "/gb.-mrpopular" ||
       (window.location.pathname+"")  === "/the" || (window.location.pathname+"")  === "/voting-topic"
  ||    (window.location.pathname+"")  === "/voting" || (window.location.pathname+"")  === "/vote-for-me-quotes"
      ){
        
            setValue(1);
            console.log(value);
    }
    else{  
        var a = window.location.href.split("/");
        var b=  a[a.length-2];

        if((b+"") ===  "user"  ){
            setValue(2);
            console.log(value);
    }
    else   if((b+"") ===  "votes"  ){
        setValue(3);
            console.log(value);
    }
}
},[])

  return (
    <div>
      {
   (  value === 1) ? <div>
      {/* homepage */}
      <Home/>
     </div>:  <div>
     {
        (  value === 2) ? <div>
                {/* app page */}
                <Apps/>
        </div>:  <div>
       
        {
        (  value === 3) ? <div>
                  {/* votes page */}
                <Result/>
        </div>:  <div>  </div>
   
         }
       </div>
   
         }

    </div>

   }

    </div>

    
      
    
  )
}

export default Route