import React,{useState, useEffect} from 'react'
import "./Home.css";
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import PostIcon from '@material-ui/icons/Link';
import db from "./firebase"
import firebase from "firebase"
import ShareIcon from "@material-ui/icons/WhatsApp"


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));



function Home() {
 const classes = useStyles();
 const [roomId,setRoomId] = useState(null);
 const [input, setInput] = useState('');
  const [inputList, setInputList] = useState([{ firstName: "", id:"1"}]);
 const [str, setStr] = useState(2);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = () => {
    const list = [...inputList];
    list.splice(list.length-1, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
  setStr(str=> str+1);
  setInputList([...inputList, { firstName: "", id:`${str}` }]);
  };

//handle create link event
const handlePost = () =>{
 //console.log(inputList)
const str= input.split(" "); 
let s="";
  for(let i=0;i< str.length;i++){
    if(str[i].length <= 20 ){
        s= s+str[i]+" ";
    }
    else{
     for( let j=0,k=20;;j=j+k){
      if(str[i].length > k+j ){
      s= s+str[i].substring(j,k+j)+" ";
      }
      else{
            s= s+str[i].substring(j,str[i].length )+" " ;
            break;
      }

     }
    }
  }


  db.collection('popular').add({
    popularQuestion: s,
    participants: inputList,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    

}).then((doc)=>{
console.log("this is roomId :" + doc.id);
let id=0
  inputList.map(({firstName})=>{
   id=id+1;
    return db.collection(doc.id).add({
     id: `${id}` ,
      firstName: firstName,
     vote: 0
    })
  })
setRoomId(doc.id)
})



}


    return (
        <div>
          
            <header id="header" className="fixed-top">
               
    <div className="container">

      <div className="logo float-left" Style={"font-size:4rem"}>
      <h1><a href="/"><span>popularInsaan</span></a></h1>
    
      </div>


      <nav className="nav-menu float-right d-none d-lg-block">
        <ul>
          <li className="active"><a href="#hero">Home</a></li>
          <li><a href="#Dashboard">Dashboard</a></li>
         
        </ul>
      </nav>

    </div>
  </header>


  <section id="hero">
    <div className="hero-container">
      <h1>Welcome to popularInsaan</h1>
      <h2>Want to know popular opinion of your friends, colleagues
      </h2>
      
      <a href="#Dashboard" className="btn-get-started scrollto">Get Started</a>
    </div>
  </section>
{/* justify-content: space between; */}
  <main id="main"/>

    <section id="Dashboard" className="Dashboard">
      <div className="container" >

        <div className="section-title">
          <h2>Dashboard</h2>
          <div className="App" >
            
          <TextField   Style={"  padding-bottom: 15px;"}
          id="standard-textarea"
          value={input}
          onChange={(e)=> setInput(e.target.value)}
          label="Popular question"
          placeholder="Placeholder"
          multiline 
        />
      {inputList.map((x, i) => {
        return (
          <div className="box"  >


  <div  >
  <TextField
        className={classes.margin}
        name="firstName"
        value={x.firstName}
        onChange={e => handleInputChange(e, i)}
        id="input-with-icon-textfield"
        label="Enter contestent name"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />

 {/**    <TextField
        className={classes.margin}
        name="lastName"
        value={x.lastName}
        onChange={e => handleInputChange(e, i)}
        id="input-with-icon-textfield"
        label="Enter Nick Name"
        
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />*/}
    </div>
          
            <div className="" Style={" align-items: center"} >

       <Button
        variant="outlined"
        color="primary"
        className={classes.button}
      
        onClick={handleAddClick}
      >
        Add
      </Button>

              {inputList.length - 1 === i &&  <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
        onClick={handleRemoveClick}
      >
        Delete
      </Button>}
            </div>
          </div>

        );
      })}


    { // <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
}

    </div>
    <div className="button-bl" style={{ marginTop: 40 }} >
<Button 
        variant="outlined"
        color="default"
        className={classes.button}
        startIcon={<PostIcon />}
        onClick={handlePost}
      >
        create link
      </Button>
</div>
{/*share link ::   "https://api.whatsapp.com/send?text=[post-title] [post-url]" 
voting.popularinsaan.com/uGBLhmcHErwwQ2M7qJvO

 <span Style={"justify-content: space-between;align-items:center; font-size: 15px"}>   <u>{`www.popularinsaan.com/user`}</u></span><br/><span Style={"justify-content: space-between;align-items:center; font-size: 15px"}>   <u>{`/${roomId}`}</u> </span>

<div  Style={"padding-top:15px; padding-bottom:1px ;font-size: 21px; min-width: fit-content;"}>or using 

</div>

*/}

<div>

<div className="flex-c-m">
{
  !roomId ? (<div></div>):(  
  <div Style={"min-width: fit-content;align-items:center;padding-top:30px; font-size: 20px;"}>Share the link to
  start popular voting 
 <br/>
    <a href={`https://api.whatsapp.com/send?text=For popular voting url: https://www.popularinsaan.com/user/${roomId}        
        For popular votes url: https://www.popularinsaan.com/votes/${roomId} `}>

   <br></br><i  Style={"align-items:center; padding: 8px;  border-radius: 7px;   color: white;  background-color: green;  "} >
     WhatsApp <ShareIcon/></i></a>
 </div>
)
} 
</div>



</div>

        </div>
      </div>
     
    </section>


  <footer id="footer">
    <div className="container">
      <div className="copyright">
        &copy; Copyright <strong><span>popularInsaan</span></strong>. All Rights Reserved
      </div>
      <div className="credits">
       
        Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
      </div>
    </div>
  </footer>
        </div>
    )
}
 

export default Home
