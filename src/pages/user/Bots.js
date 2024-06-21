/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable radix */

import React, { useState } from 'react';
import { Box, Button, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LoadingButton from '@mui/lab/LoadingButton';

// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getAllBots, } from '../../redux/slices/bot/allbots';
import { updateBotReducer, } from '../../redux/slices/bot/updateBot';


const ManageBotsPage = () => {

    const dispatch = useDispatch();
    const {   bots,  } = useSelector((state) => state.allBots); 
    const {    success, isLoading } = useSelector((state) => state.updateBot);
   
    React.useEffect(() => {
      dispatch(getAllBots());
    },[success])
 



  const [open, setOpen] = useState(false);
  const [selectedBot, setSelectedBot] = useState(null);



  const handleUpdate = (bot) => {
    setSelectedBot(bot);
    setOpen(true);
  };

  const handleSave = () => {

    dispatch(updateBotReducer(selectedBot))
    setOpen(false);
  
  };

  return (
    <Box p={2} display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h4" gutterBottom>
        Manage Bots
      </Typography>
      <Button href='/user/create-bot'>Create New Bots</Button>
      <Button href='/user/trading/bot-trading'>Trade with bot</Button>
      <List>
        {bots.map((bot) => (
          <ListItem key={bot.id} alignItems="flex-start">
            <ListItemText
              primary={bot.botName}
              secondary={
                <>
                  <Typography variant="body2" color="textSecondary">Total Trades: {bot.totalTrades}</Typography>
                  <Typography variant="body2" color="textSecondary">Total Losses: {bot.totalLosses}</Typography>
                  <Typography variant="body2" color="textSecondary">Subscribers: {bot.subscribers}</Typography>
                  <Typography variant="body2" color="textSecondary">Info: {bot.info}</Typography>
                  <Typography variant="body2" color="textSecondary">Creator: {bot.creator}</Typography>
                </>
              }
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => handleUpdate(bot)}>
                <EditIcon color="primary" />
              </IconButton>
          
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Update Bot</DialogTitle>
        <DialogContent>
          <DialogContentText>Update the details of the bot.</DialogContentText>
          {selectedBot && (
            <>
              <TextField
                fullWidth
                margin="normal"
                label="Name"
                value={selectedBot.botName}
                onChange={(e) => setSelectedBot({ ...selectedBot, botName: e.target.value })}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Total Trades"
                type="number"
                value={selectedBot.totalTrades}
                onChange={(e) => setSelectedBot({ ...selectedBot, totalTrades: parseInt(e.target.value) })}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Total Losses"
                type="number"
                value={selectedBot.totalLosses}
                onChange={(e) => setSelectedBot({ ...selectedBot, totalLosses: parseInt(e.target.value) })}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Subscribers"
                type="number"
                value={selectedBot.subscribers}
                onChange={(e) => setSelectedBot({ ...selectedBot, subscribers: parseInt(e.target.value) })}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Info"
                value={selectedBot.info}
                onChange={(e) => setSelectedBot({ ...selectedBot, info: e.target.value })}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Creator"
                value={selectedBot.creator}
                onChange={(e) => setSelectedBot({ ...selectedBot, creator: e.target.value })}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
          <LoadingButton onClick={handleSave} color="secondary" loading= {isLoading}>Save</LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageBotsPage;

