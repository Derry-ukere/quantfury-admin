/* eslint-disable react/prop-types */
import * as React from 'react';
import PropTypes from 'prop-types';
import { sentenceCase } from 'change-case';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';
// @mui
import { Stack, Box, TableRow,CardHeader } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Options from '../table-options/DepositOptions';

import { JobTitleStyle, LabelStyle, TableHeadStyle, TableRowStyle } from './styles';
import Label from '../Label';



export default function BasicTable({ tableConfig }) {
  const {body} = tableConfig;
  const {headers} = tableConfig;
  const emptyRow = body.length === 0 || !body;
  const [container, setContainer] = React.useState([]);
  const [users, setusers] = React.useState([]);
  const [pages, setPages] = React.useState(2);

  

  React.useEffect(() => {
    const depositsInfo = body.map((deposit) => ({
      name: `${deposit.name}`,
      amount: deposit.amount,
      amountInCrypto: deposit.amountInCrypto,
      status:  deposit.status,
      proof : deposit.proof,
      id: deposit.id,
      details: {
        paymentMethod: (deposit.paymentMethod || 'No payment method'),
      },
      
      openTooltip: false,
    }));

    setPages(Math.ceil(depositsInfo.length / 5))
    setusers(depositsInfo)
    setContainer(depositsInfo.slice(0, 5));
  }, [body]);

  
  function paginate(array, pageSize, pageNumber) {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  }

  const handleChange =(e, page) => {
    setContainer(paginate(users, 5, page));
  }

  

  return (
    <Box>
    <CardHeader title= {tableConfig.title}  />
    <Stack spacing={2} direction="column">
      {tableConfig.loading &&  <LinearColor />}
      {!emptyRow && (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="large" aria-label="a dense table">
              <TableHeadStyle>
                <TableRow>
                  {
                    headers.map((header,index)=>(
                    <TableCell align={header.align} key = {index}>
                        <LabelStyle>  {header.title}</LabelStyle>
                    </TableCell>
                    ))
                  }
                </TableRow>
              </TableHeadStyle>
              <TableBody>
                {container.map((row, index) => (
                  <TableRowStyle key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row" >
                      <Stack spacing={1}>
                        <JobTitleStyle>{row.name}</JobTitleStyle>
                        <Stack direction={'row'} divider={<div>.</div>}>
                          <LabelStyle> via {row.details.paymentMethod}</LabelStyle>
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell align="center">
                      <LabelStyle>{row.amount}</LabelStyle>
                    </TableCell>
                    <TableCell align="center">
                      <LabelStyle>{row.amountInCrypto}</LabelStyle>
                    </TableCell>
                   
                    <TableCell align="center" >
                      <Label
                        variant='ghost'
                        color={
                          (row.status === 'pending' && 'warning') || (row.status === 'declined' && 'error') || 'success'
                        }
                        sx={{ border: 0 }}
                      >
                        {sentenceCase(row.status)}
                      </Label>
                    </TableCell>
                    <TableCell align="center">
                     {row.proof ? <LabelStyle><img src= {row.proof} alt = "payment proof" height={60}/></LabelStyle> :<LabelStyle> NO PAYMENT PROOF</LabelStyle> } 
                    </TableCell>
                    <TableCell align="center">
                      <Options open={row.openTooltip} id={row.id} />
                    </TableCell>
                  </TableRowStyle>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack direction={'row'} justifyContent="space-between" alignItems="center">
            <Box>{''}</Box>
            <Pagination count={pages} variant="outlined" shape="rounded" onChange={handleChange} />
          </Stack>
        </>
      )}
    </Stack>
  </Box>
  
  )

}


function LinearColor() {
  return (
    <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
      <LinearProgress color="secondary" />
      <LinearProgress color="success" />
      <LinearProgress color="inherit" />
    </Stack>
  );
}

BasicTable.prototype = {
  rows: PropTypes.array.isRequired,
  tableHead: PropTypes.array.isRequired,
};
