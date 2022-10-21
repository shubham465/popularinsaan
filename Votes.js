import React,{useState,useEffect} from 'react'
import db from "./firebase"
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useStateValue} from "./StateProvider";
import {actionTypes} from "./reducer";




  
  const useStyles = makeStyles({
    table: {
      minWidth: 0,
    },
  });


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  

function Votes({roomId}) {
  const [{results}, dispatch] = useStateValue();
    const classes = useStyles();
    
      useEffect(() => {
       
          db.collection(roomId).orderBy("vote","desc").get().then(
          (querySnapshot) => {
            let data= new Array(300)
            let i = 0;
            querySnapshot.forEach((doc) => {
            data[i]= doc.data()
              i++;
            } )
             
           dispatch({
              type: actionTypes.fetchresult,
           results: data
            })  }).catch((err)=>{
              console.log(err);
              }) 
           
      }, [])

      
   

    return (
        <div>
          {!results?(<div></div>):(<div> <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>FirstName</StyledTableCell>
       
            <StyledTableCell align="right">Vote</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((row) => (
               <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                {row.firstName}
              </StyledTableCell>
           
              <StyledTableCell align="right">{row.vote}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer></div>)}
           
        </div>
    )
}

export default Votes
