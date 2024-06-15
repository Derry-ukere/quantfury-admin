/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import React from 'react';

import Container from '@mui/material/Container';
import { Grid, Stack, Button } from '@mui/material';
import Paper from '@mui/material/Paper';

import Chart from '../../components/Chart';
import Deposits from '../../components/Deposits';
import BasicTable from '../../components/basic-table/UsersTable';

import { useDispatch, useSelector } from '../../redux/store';
import {listActiveUsers,listSuspendedUsers,listBlockedUsers,listDeclinedUsers,listPendingUsers } from '../../redux/slices/users/listusers';



const Home = () => {
  const dispatch = useDispatch();

  const { users, isLoading, error } = useSelector((state) => state.allUsers);

  React.useEffect(() => {
    dispatch(listActiveUsers())
  }, [])

  const fetchDeclinedUsers = () => dispatch(listDeclinedUsers())
  const fetchBlockedsers = () => dispatch(listBlockedUsers())
  const fetchSuspendedsers = () => dispatch(listSuspendedUsers())
  const fetchActivesers = () => dispatch(listActiveUsers())
  const fetchpendingusers = () => dispatch(listPendingUsers())






  const headers = [
    {
      id: 1,
      title: "DETAILS",
      align: "left",
    },
    {
      id: 2,
      title: "FRONT ID",
      align: "left"
    },
    {
      id: 3,
      title: "BACK ID",
      align: "left"
    },
    {
      id: 4,
      title: "STATUS",
      align: "left"
    },
    {
      id: 5,
      title: "",
      align: "right"
    }
  ]

  const tableConfig = {
    title: 'Users',
    headers,
    body: users,
    loading: isLoading,
    error,
    type: 'users'
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Chart />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Deposits />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Stack direction={"row"} justifyContent="space-around">

            <Button variant='contained' color='primary' onClick={fetchpendingusers}>
                pending users
              </Button>

              <Button variant='contained' color='success' onClick={fetchActivesers}>
                Active Users
              </Button>

              <Button variant='contained' color='warning' onClick={fetchSuspendedsers}>
                suspended Users
              </Button>

              <Button variant='contained' color='info' onClick={fetchDeclinedUsers}>
                declined Users
              </Button>

              <Button variant='contained' color='error' onClick={fetchBlockedsers}>
                blocked Users
              </Button>
            </Stack>
            <BasicTable tableConfig={tableConfig} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
