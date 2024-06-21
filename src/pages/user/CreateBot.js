import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Snackbar, Alert } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';



// redux
import { useDispatch, useSelector } from '../../redux/store';
import { createBotReducer, } from '../../redux/slices/bot/createBot';

const CreateBotPage = () => {
    const dispatch = useDispatch();
    const { isLoading, error, success } = useSelector((state) => state.createBot);

    const [botName, setBotName] = useState('');
    const [totalTrades, setTotalTrades] = useState('');
    const [totalLosses, setTotalLosses] = useState('');
    const [subscribers, setSubscribers] = useState('');
    const [info, setInfo] = useState('');
    const [creator, setCreator] = useState('');

    const handleCreateBot = () => {
        if (!botName || !totalTrades || !totalLosses || !subscribers || !info || !creator) {
            // eslint-disable-next-line no-alert
            alert('Please fill in all fields.');
            return;
        }
        dispatch(createBotReducer({ botName, totalTrades, totalLosses, subscribers, info, creator }))
        // Handle the creation logic here, e.g., send the bot details to an API
        console.log('Creating bot:', { botName, totalTrades, totalLosses, subscribers, info, creator });
        // Clear the form fields
        setBotName('');
        setTotalTrades('');
        setTotalLosses('');
        setSubscribers('');
        setInfo('');
        setCreator('');
    };

    return (
        <Box p={2} display="flex" flexDirection="column" alignItems="center">
            <Snackbar
                open={success || error}
                autoHideDuration={600}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert severity="success" sx={{ width: '100%' }}>
                    {(success && "success") || (error && error)}
                </Alert>
            </Snackbar>
            <Typography variant="h4" gutterBottom>
                Create a New Bot
            </Typography>
            <TextField
                fullWidth
                margin="normal"
                id="bot-name"
                label="Bot Name"
                variant="outlined"
                value={botName}
                onChange={(e) => setBotName(e.target.value)}
            />
            <TextField
                fullWidth
                margin="normal"
                id="total-trades"
                label="Total Trades"
                variant="outlined"
                type="number"
                value={totalTrades}
                onChange={(e) => setTotalTrades(e.target.value)}
            />
            <TextField
                fullWidth
                margin="normal"
                id="total-losses"
                label="Total Losses"
                variant="outlined"
                type="number"
                value={totalLosses}
                onChange={(e) => setTotalLosses(e.target.value)}
            />
            <TextField
                fullWidth
                margin="normal"
                id="subscribers"
                label="Subscribers"
                variant="outlined"
                type="number"
                value={subscribers}
                onChange={(e) => setSubscribers(e.target.value)}
            />
            <TextField
                fullWidth
                margin="normal"
                id="info"
                label="Info"
                multiline
                rows={4}
                variant="outlined"
                value={info}
                onChange={(e) => setInfo(e.target.value)}
            />
            <TextField
                fullWidth
                margin="normal"
                id="creator"
                label="Creator"
                variant="outlined"
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
            />
            <LoadingButton variant="contained" color="primary" onClick={handleCreateBot} loading={isLoading}>
                Create Bot
            </LoadingButton>
        </Box>
    );
};

export default CreateBotPage;
