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
import Options from '../table-options/WithdrawalOptions';
// @mui
import { JobTitleStyle, LabelStyle, TableHeadStyle, TableRowStyle } from './styles';
import Label from '../Label';



export default function BasicTable({ tableConfig }) {
  const {body} = tableConfig;
  const {headers} = tableConfig;
  const [container, setContainer] = React.useState([]);
  const [users, setusers] = React.useState([]);
  const [pages, setPages] = React.useState(2);

  React.useEffect(() => {
    console.log('body', body)
    const withdrawalInfo = body.map((withdrawal) => ({
      name:  (withdrawal.Clientname || 'no name'),
      amount: (withdrawal.amount || "no amount"),
      network: (withdrawal.network || "no network"),
      walletId: (withdrawal.walletAddress || "no id"),
      status:  (withdrawal.status || "no status"),
      id : withdrawal.id,
      openTooltip: false,
    }));

    setPages(Math.ceil(withdrawalInfo.length / 5))
    setusers(withdrawalInfo)
    setContainer(withdrawalInfo.slice(0, 5));
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
      {!tableConfig.loading && (
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
                      </Stack>
                    </TableCell>
                    <TableCell align="center">
                      <LabelStyle>{row.amount}</LabelStyle>
                    </TableCell>
                    <TableCell align="center">
                      <LabelStyle>{row.network}</LabelStyle>
                    </TableCell>
                    <TableCell align="center">
                      <LabelStyle>{row.walletId}</LabelStyle>
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
