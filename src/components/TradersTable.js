/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LoadingButton from '@mui/lab/LoadingButton';

//
import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import VerificationStatus from './VerifyTick';


// redux
import { useDispatch,useSelector } from '../redux/store';
import { deleteTraders } from '../redux/slices/user';
import { verifytrader } from '../redux/slices/trader/verifyTrader';


const headers = ['Name','Image',]


export default function BasicTable({users}) {    
    const [dep, setDep] = React.useState([])
    const dispatch = useDispatch();
    const {  isLoading,success } = useSelector((state) => state.verifytrader);

    const deleteAdmin = (id, index)=> {
        const LoadedState = [...dep];
        LoadedState[index].loading = true;
        setDep(LoadedState)
        dispatch(deleteTraders(`${id}`)).then(() => {
            const LoadedState = [...dep];
            LoadedState[index].loading = false;
            LoadedState[index].deleted = true;
            setDep(LoadedState)
        })
    }

     const markAsverified = (tradersId) => {
        dispatch(verifytrader(tradersId))
     }

  React.useEffect(()=>{
    if(users){
      const cloned = users.map((users) => (
        {
          loading : false,
          deleted : false,
          firstName : users.name,
          imageUrl: users.imageUrl,
          id : users.id, 
          verified : users.verified
        }
      ))
      setDep(cloned)
    }
  },[users])

  const downloadFile = (link) => {
    window.location.href = `${link}`
  }

  
  return (
    <TableContainer component={Paper}>
            <h3 style={{marginLeft : 10}}>Traders</h3>
        <Snackbar
          open={success}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert  severity="success" sx={{ width: '100%' }}>
            Trader verified
          </Alert>
        </Snackbar>
      <Table sx={{ minWidth: 650, }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key = {header} align="left">{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {!dep? (
            <p>loading ..</p>
          ):
          dep.map((user, index) => (
            <TableRow
              key={user.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row"  align="left">
                {user.firstName}   <VerificationStatus verified= {user.verified}/>
              </TableCell>
              <TableCell align="center" onClick={() => downloadFile(user.backView)}><img alt = "no ID" src = {user.imageUrl} style = {{height : 100, width: 100}}/></TableCell>
              <TableCell align="center"><LoadingButton  variant="outlined"  disabled = {user.deleted} loading = {user.loading} onClick = {() => deleteAdmin(user.id, index)}>{user.deleted ? 'Deleted': "Delete Trader"}</LoadingButton> </TableCell>
              <TableCell align="center"><LoadingButton  variant="outlined"  loading = {isLoading} onClick = {() => markAsverified(user.id)}>Mark as Verified</LoadingButton> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
