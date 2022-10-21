import React,{useState} from 'react';
import "./Login.css"
import {auth,provider, fbprovider } from "./firebase";
import {useStateValue} from "./StateProvider.js";
import {actionTypes} from "./reducer";


function Login() {
const [{}, dispatch] = useStateValue();
/*
const [email, setEmail] = useState("");
const [pass, setPass]  = useState("");
const [open,setOpen]= useState(false);
*/

provider.setCustomParameters({
    'display': 'popup'
  });


const signIn= ()=>{
    auth.signInWithPopup(provider).then(result=>{
       dispatch({
           type: actionTypes.SET_USER,
        user: result.user,       });
    //    setPass();
    }).catch((error)=>{ 
        alert(error.messege)})

};

const fbsignIn = () =>{
    
    
  auth
  .signInWithPopup(fbprovider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // The signed-in user info.
    var user = result.user;
    dispatch({
        type: actionTypes.SET_USER,
     user: result.user       });
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var accessToken = credential.accessToken;

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    // ...
    alert("something went wrong");
    console.log(error);
  });
}
/*
const emailsignIn = (e) =>{
e.preventDefault()

    auth.signInWithEmailAndPassword(email, pass)
  .then((userCredential) => {
 
    dispatch({
        type: actionTypes.SET_USER,
     user: userCredential.user       });
    
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    setPass("");
   alert(errorMessage)
   
})



}*/

    return (
<div>

        
        <div>
        <div className="limiter">
    <div className="container-login100" id="img" >
        <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
            <form className="login100-form validate-form">
                <span className="login100-form-title p-b-49">
                    Login
                </span>

          {/*      <div className="wrap-input100 validate-input m-b-23" data-validate = "Username is reqired">
                    <span className="label-input100">Username</span>
                    <input value={email} onChange={e => setEmail(e.target.value)} className="input100" required type="email" name="username" placeholder="Type your username"/>
                    <span className="focus-input100" data-symbol="&#xf206;"></span>
                </div>

                <div className="wrap-input100 validate-input" data-validate="Password is required">
                    <span className="label-input100">Password</span>
                    <input value={pass} onChange={e => setPass(e.target.value)} className="input100" required type="password" name="pass" placeholder="Type your password"/>
                    <span className="focus-input100" data-symbol="&#xf190;"></span>
                </div>
                
                <div className="text-right p-t-8 p-b-31">
                    <a href="#">
                        Forgot password?
                    </a>
                </div>
                
                <div className="container-login100-form-btn">
                    <div className="wrap-login100-form-btn">
                        <div className="login100-form-bgbtn"></div>
                        <button className="login100-form-btn" onClick={emailsignIn} >
                            Login
                        </button>
                    </div>
                </div>

                <div className="txt1 text-center p-t-54 p-b-20">
                    <span>
                        Or Sign Up Using
                    </span>
                </div>
   */}
                <div className="flex-c-m">
                    <a href="#" className="login100-social-item bg1">
                        <i className="fa fa-facebook" onClick={fbsignIn}></i>
                    </a>
{/* 
                    <a href="#" className="login100-social-item bg2">
                        <i className="fa fa-twitter"></i>
                    </a>
*/}
                    <a href="#" className="login100-social-item bg3" >
                        <i className="fa fa-google" onClick={signIn} ></i>
                    </a>
                </div>

               
                
            </form>
        </div>
    </div>
</div>


<div id="dropDownSelect1"></div>
    </div>
    
    </div>
    )
}

export default Login
