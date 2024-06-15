/* eslint-disable react/prop-types */
import * as React from 'react';
// @mui
import { Stack, styled, Box, TextField, Typography } from '@mui/material';
import Image from './Image';

export const StyleTextField = styled(TextField)`
  fieldset {
    border-radius: 0px;
  }
`;



const HeaderStyle = {
  color: '#023047',
  fontSize: '24px',
  fontWeight: '500',
  textAlign: 'center',
};

const paragraphStyle = {
  color: '#7E858E',
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: 1.5,
  textAlign: 'center',
};



export default function EmptyState() {
  return (
    <Box>
      <Stack spacing={2}>
        <Box sx={{ maxWidth: '50%' }} alignSelf="center">
          <Stack spacing={2}>
            <Image alt="country" src={'assets/images/site/empty-jobs.png'} sx={{ width: 300, marginLeft: 5 }} />
            <Typography sx={{ ...HeaderStyle }}>Nothing to see here, yet.</Typography>
            <Typography sx={{ ...paragraphStyle }}>
              The database is empty at the moment, data will be to populate here when active !
            </Typography>

          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
