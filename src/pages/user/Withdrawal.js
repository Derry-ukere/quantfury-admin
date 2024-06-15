/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable arrow-body-style */
import React from 'react';
import WithdrawalTable from '../../components/basic-table/WithdrawalTable'

// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getAllWithdrawals } from '../../redux/slices/withdrawal/get-withdrawal';

const FundAccount = () => {
  
  const dispatch = useDispatch();
  const {  isLoading,withdrawals, error } = useSelector((state) => state.allWithdrawals);
 
  React.useEffect(() => {
    dispatch(getAllWithdrawals());
  },[])

  React.useEffect(() => {
    console.log({
      withdrawals,
      isLoading,
      error
    }) 
  },[withdrawals])

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
      title : "Network",
      align : "left",
    },
    {
      id :6,
      title : "Wallet ID",
      align : "left"
    },
    {
      id :7,
      title : "status",
      align : "left"
    },
    {
      id :8,
      title : "",
      align : "right"
    }
   ]

   const tableConfig = {
    title: 'Withdrawals',
    headers,
    body: withdrawals,
    loading : isLoading,
    error,
    type : 'withdrawal'
  }

  return (
    <div>
      <main className="app-py-1" style={{ height: '100vh' }}>
        <div className="fade-appear-done fade-enter-done">
        <div className="app-relative hero-mixed">
      <div className="overlay1" />
      <div className="fade-appear-done fade-enter-done" style={{ paddingBottom: '6rem', paddingTop: '2rem' }}>
        <h1 className="center app-relative white-text">Recent Withdrawals</h1>
      </div>
    </div>
          <section className="row" style={{padding : 20}}>
            {/* <WithdrawalTable  withdraws = {allWithdrawals}/> */}
            <WithdrawalTable  tableConfig = {tableConfig}/>

          </section>
        </div>
      </main>
    </div>
  );
};

export default FundAccount;