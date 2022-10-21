
import React,{useState,useEffect} from 'react'
import db  from "./firebase";
import "./User.css"
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
//import AccountCircle from '@material-ui/icons/AccountCircle';
//import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
//import FormGroup from '@material-ui/core/FormGroup';
//import MenuItem from '@material-ui/core/MenuItem';
//import Menu from '@material-ui/core/Menu';
import firebase from "firebase";
import {useStateValue} from "./StateProvider";
//import {actionTypes} from "./reducer";
import Lists from "./Lists"
import Avatar from "@material-ui/core/Avatar"
import Radio from "@material-ui/core/Radio"
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Snackbar from '@mui/material/Snackbar';


const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 0,
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2)
      },
      title: {
        flexGrow: 1,
      },
      
      small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
      },
      large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
      },
     
  }));

 function User({userName,photoURL,uid,roomId}) {
  
    const [{participants}, dispatch] = useStateValue();
    const classes = useStyles();
    const [auth, setAuth] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const ope = Boolean(anchorEl);
    const [value, setValue] = React.useState('');


    const handle = (event) =>{
      setValue(event.target.value);
    }
    const handleChange = () => {
   
   const ide= `${uid}`
     console.log("uid "+ uid);
      const increment = firebase.firestore.FieldValue.increment(1);
     const dbref= db.collection(roomId).where("uid","array-contains",ide);

     dbref.get().then(doc=>{
       
     if(!doc.empty)
    alert("You have already Voted");
     else 
     {
    
      db.collection(roomId).where("id","==",value).get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {    
            var uidn= `${uid}`;
              // doc.data() is never undefined for query doc snapshots
          db.collection(roomId).doc(`${doc.id}`).update({
            vote: increment ,
            uid: firebase.firestore.FieldValue.arrayUnion(uidn)
          }).then(()=>{
            document.getElementById("hidingEle").click();
            console.log("successfully completed update")
            setTimeout(function() {  document.getElementById("linkToVotes").click();}, 650);
           
    
          })  
          });
      })
      .catch((error) => {
          console.log("Error documents: ", error);
          alert("You have already Voted ");
    
      });
     }
     })


     }
  
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    

   /* const handleSignout = () => {
      handleClose()
      firebase.auth().signOut().then(() => {
    
     document.getElementById("linkToAdmin").click();
      }).catch((error) => {
      alert(" An error happened.")
      });
      
    }
*/
const [open,setOpen]= useState(false);
const [vertical,setVertical]= useState('bottom');
const [horizontal, setHorizontal]= useState('right');


const handleClick = () => () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};
 
      return (
       <div>{
!participants?( <div><Lists roomId={roomId}/></div>):(
  <div><div className={classes.root}>
     
     <AppBar position="static">
       <Toolbar>
         <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
           
         </IconButton>
         <Typography variant="h6" className={classes.title}>
           popularInsaan
         </Typography>
         {auth && (
           <div>
             <IconButton
               aria-label="account of current user"
               aria-controls="menu-appbar"
               aria-haspopup="true"
               onClick={handleMenu}
               color="inherit"
             >
         
             <Avatar src={photoURL} className={classes.small}/>
            
             </IconButton>
          {/*   <Menu
               id="menu-appbar"
               anchorEl={anchorEl}
               anchorOrigin={{
                 vertical: 'top',
                 horizontal: 'right',
               }}
               keepMounted
               transformOrigin={{
                 vertical: 'top',
                 horizontal: 'right',
               }}
               open={open}
               onClose={handleClose}
             >
               
            //  <MenuItem onClick={handleSignout}>Signout</MenuItem>
           
             </Menu>*/
            }
           </div>
         )}
       </Toolbar>
     </AppBar>
   </div>

<div className="user-content">

{/* list  of popular candidates*/}
            <React.Fragment>
   <CssBaseline/>
     <Container maxWidth="sm" >
     

     
     <div className="question">
      {participants.popularQuestion}


      </div>
      

     <FormControl component="fieldset">
  
      <FormLabel component="legend" Style={"padding: 4px; margin-left: 2px"}>participants</FormLabel>
      <RadioGroup aria-label="candidates" name="candisates" value={value} onChange={handle}>
{
participants.participants.map(({firstName,id})=>{
return <div><FormControlLabel value={id}  control={<Radio />} label={firstName.toUpperCase()} ></FormControlLabel>
</div>
})


}

<div className={classes.root} >
      <Button variant="contained" color="primary" onClick={handleChange} Style={"margin: 30px; margin-left: 100px"} >
        Submit
      </Button>
</div>


</RadioGroup>
    </FormControl>
    
     </Container>
     <Button
     id="hidingEle"
    Style={'display: none'}
        onClick={handleClick({
          vertical: 'bottom',
          horizontal: 'right',
        })}
      >
        Bottom-Right
      </Button>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Successfully voted"
        key={vertical + horizontal}
      />
   </React.Fragment>
   </div>
   <a id="linkToVotes" href={`https://www.popularinsaan.com/votes/${roomId}`} > </a>


  </div>
)}


{/* list of candidates */}


    </div>     
  
    )
}

export default User

