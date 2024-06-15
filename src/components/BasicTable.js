import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  IconButton,
  TableContainer,
  Pagination
} from '@mui/material';

// components
import Label from './Label';
import Iconify from './Iconify';
import MenuPopover from './MenuPopover';

// ----------------------------------------------------------------------

export default function BasicTable({ config }) {
  const theme = useTheme();
  const users = config.body

  useEffect(() => {
    console.log('users',users)
  },[users])

  const userTable = (
    <Card>
      <CardHeader title="New Users" />
      <Box sx={{ overflow: 'scroll' }}>
        <TableContainer >
          <Table>
            <TableHead>
              <TableRow>
                {config.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    variant="head"
                    >
                    {header.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users === [] ?(<div> loading ...</div>)  :
              users.map((row) => (
                <TableRow key={row.id}>
                  <TableCell >{row.displayName || 'admin user'}</TableCell>
                  <TableCell> {row.country} <br />{row.mobile_number} <br />{row.email} <br /> token :  {row.token} </TableCell>
                  <TableCell >
                    <img src= {row.photo_back_view} alt = "id card" height={60}/>
                  </TableCell>
                  <TableCell>
                    <img src= {row.photo_front_view} alt = "id card" height={60}/>
                  </TableCell>
                  <TableCell>
                    <Label
                      variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                      color={
                        (row.status === 'in_progress' && 'warning') ||
                        (row.status === 'out_of_date' && 'error') ||
                        'success'
                      }
                      sx={{ border: 0 }}
                    >
                      {row.status || 'approved'}
                    </Label>
                  </TableCell> 
                  <TableCell align="right">
                    <MoreMenuButton menuConfig={config} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Divider />
      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Pagination count={5} variant="outlined" shape="rounded" />
      </Box>
    </Card>
  )

  if (config.type === 'userTable') {
    return (
      userTable
    );
  }

}


// ----------------------------------------------------------------------

function MoreMenuButton({menuConfig}) {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };



  const handleClose = () => {
    setOpen(null);
  };

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };

 if(menuConfig.type === 'userTable'){
  return (
    <>
      <IconButton size="large" onClick={handleOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -0.5,
          width: 160,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:checkmark-outline'} sx={{ ...ICON }} />
          Approve
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />
        <MenuItem >
          <Iconify icon={'eva:loader-outline'} sx={{ ...ICON }} />
          Probation
        </MenuItem>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
          Decline
        </MenuItem>



      </MenuPopover>
    </>
  );
 }
}

BasicTable.propTypes = {
  config: PropTypes.object
};
MoreMenuButton.propTypes = {
  menuConfig: PropTypes.object
};
