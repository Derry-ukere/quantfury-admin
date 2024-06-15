/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable arrow-body-style */
import React from 'react';
import { Stack, Button } from '@mui/material';

import BasicTable from '../../components/basic-table/DepositTable';



// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getApprovedDeposit,getDeclinedDeposit,getPendingDeposit } from '../../redux/slices/deposits/get-deposits';

const FundAccount = () => {
  
  const dispatch = useDispatch();
  const {  deposits,isLoading, error } = useSelector((state) => state.deposits);
 
  React.useEffect(() => {
    dispatch(getPendingDeposit());
  },[])

  const fetchApprovedDeposits = () => dispatch(getApprovedDeposit())
  const fetchPending = () => dispatch(getPendingDeposit())
  const fetchDeclinedDeposits = () => dispatch(getDeclinedDeposit())

  const headers = [
    {
      id : 1,
      title : "Client Name",
      align : "left",
    },
    {
      id : 2,
      title : "Amount ($)",
      align : "left",
    },
    {
      id : 3,
      title : "Amount (crypto)",
      align : "left",
    },
    {
      id :5,
      title : "Status",
      align : "left"
    },
    {
      id :6,
      title : "Payment proof",
      align : "left"
    },
    {
      id :7,
      title : "",
      align : "right"
    }
   ]

  const tableConfig = {
    title: 'deposits',
    headers,
    body: deposits,
    loading : isLoading,
    error,
    type : 'deposits'
  }

  return (
    <div>
      <main className="app-py-1" style={{ height: '100vh' }}>
        <div className="fade-appear-done fade-enter-done">
        <div className="app-relative hero-mixed">
      <div className="overlay1" />
      <div className="fade-appear-done fade-enter-done" style={{ paddingBottom: '6rem', paddingTop: '2rem' }}>
        <h1 className="center app-relative white-text">Recent Deposits</h1>
      </div>
    </div>
          <section className="row" style={{padding : 20}}>
          <Stack direction={"row"} justifyContent="space-around">
              <Button variant='contained' color='success'onClick={fetchApprovedDeposits} >
                approved deposits
              </Button>

              <Button variant='contained' color='warning' onClick={fetchDeclinedDeposits}>
                declined deposits
              </Button>

              <Button variant='contained' color='warning' onClick={fetchPending}>
                pending deposits
              </Button>
            </Stack>
          <BasicTable  tableConfig={tableConfig}/>
          </section>
        </div>
      </main>
    </div>
  );
};

export default FundAccount;