/* eslint-disable react/prop-types */
import * as React from 'react';

// @mui
import {  IconButton, MenuItem, Divider } from '@mui/material';
import Iconify from '../Iconify';
import MenuPopover from '../MenuPopover';
import Modal from '../Modal';

 



export default function MoreMenuButton({id}) {
  const [open, setOpen] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [action, setAction] = React.useState('');

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleOpenModal = (argument) => {
    setAction(argument)
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };

  return (
    <>
     <Modal open = {openModal} handleClose = {handleCloseModal}  id = {id} type ={'delete'} actionType = {action}/>

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
        <MenuItem onClick = {()=>handleOpenModal("approve")}>
          <Iconify icon={'eva:edit-2-outline'} sx={{ ...ICON }} />
          Approve User
        </MenuItem>
        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick = {()=>handleOpenModal("suspend")}>
          <Iconify icon={'eva:loader-outline'} sx={{ ...ICON }} />
          Suspend User
        </MenuItem>
        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem sx={{ color: 'error.main' }} onClick = {()=>handleOpenModal("decline")}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
          Decline Kyc
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick = {()=>handleOpenModal("block")} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:loader-outline'} sx={{ ...ICON }} />
          Block User
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />
      </MenuPopover>
    </>
  );
}


