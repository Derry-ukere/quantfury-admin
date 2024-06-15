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
import Options from '../table-options/UsersOptions';

import { JobTitleStyle, LabelStyle, TableHeadStyle, TableRowStyle } from './styles';
import Label from '../Label';
 


export default function BasicTable({ tableConfig }) {
  const {body} = tableConfig;
  const {headers} = tableConfig;
  const [container, setContainer] = React.useState([]);
  const [users, setusers] = React.useState([]);
  const [pages, setPages] = React.useState(2);

  

  React.useEffect(() => {
    const usersInfo = body.map((user) => ({
      title: `${user.firstName} ${user.lastName}`,
      back_id: user.photo_back_view,
      front_id: user.photo_front_view,
      status: (user.account_status || 'set status'),
      id: user.uid,
      details: {
        token: (user.token || 'No token'),
        email: user.email,
        country: user.country,
      },
      openTooltip: false,
    }));

    setPages(Math.ceil(usersInfo.length / 5))
    setusers(usersInfo)
    setContainer(usersInfo.slice(0, 5));
  }, [body]);

  
  function paginate(array, pageSize, pageNumber) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
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
                        <LabelStyle> {header.title}</LabelStyle>
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
                        <JobTitleStyle>{row.title}</JobTitleStyle>
                        <Stack direction={'row'} divider={<div>.</div>}>
                          <LabelStyle>{row.details.token}</LabelStyle>
                          <LabelStyle>{row.details.email}</LabelStyle>
                          <LabelStyle>{row.details.country}</LabelStyle>
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell align="center">
                     {row.front_id ? <LabelStyle><img src= {row.front_id} alt = "id card" height={60}/></LabelStyle> :<LabelStyle> No Id</LabelStyle> } 
                    </TableCell>
                    <TableCell align="center" >
                    {row.back_id ? <LabelStyle><img src= {row.back_id} alt = "id card" height={60}/></LabelStyle> :<LabelStyle> No Id</LabelStyle> } 
                    </TableCell>
                    <TableCell align="center" >
                      <Label
                        variant='ghost'
                        color={
                          (row.status === 'suspended' && 'warning') || (row.status === 'declined' && 'primary') || (row.status === 'blocked' && 'error') || 'success'
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
