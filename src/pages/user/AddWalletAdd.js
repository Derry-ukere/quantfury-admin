import React, { useState,useEffect } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography,Snackbar,Alert } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// redux
import { useDispatch, useSelector } from '../../redux/store';
import { setWalletAddressReducer, } from '../../redux/slices/settings/setWalletAddress';

const WalletAddressInput = () => {
  const dispatch = useDispatch();
  const {  isLoading,error, success } = useSelector((state) => state.setWalletAddress);

  const [walletAddressType, setWalletAddressTYp] = useState('');
  const [walletAddress, setWalletAddress] = useState('');

  const handleBarcodeTypeChange = (event) => {
    setWalletAddressTYp(event.target.value);
  };

  const handleWalletAddressChange = (event) => {
    setWalletAddress(event.target.value);
    
  };

  useEffect(()=>{
 console.log({
  isLoading,error, success  
 })
  },[isLoading,error, success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setWalletAddressReducer(walletAddress,walletAddressType ))
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={2}>
        <Snackbar
          open={success || error}
          autoHideDuration={600}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert  severity="success" sx={{ width: '100%' }}>
           {(success  && "success") || (error && error)}
          </Alert>
        </Snackbar>
      <Typography variant="h5" gutterBottom>
        Enter Your Wallet Address
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel id="barcode-type-label">Select Barcode Type</InputLabel>
        <Select
          labelId="barcode-type-label"
          id="barcode-type"
          value={walletAddressType}
          onChange={handleBarcodeTypeChange}
          label="Select Barcode Type"
        >
          <MenuItem value="USDTWALLETADDRESS">USDT</MenuItem>
          <MenuItem value="BTCWALLETADDRESS">BTC</MenuItem>
          <MenuItem value="ETHWALLETADDRESS">ETH</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        margin="normal"
        id="wallet-address"
        label="Wallet Address"
        variant="outlined"
        value={walletAddress}
        onChange={handleWalletAddressChange}
      />
      <LoadingButton variant="contained" color="primary" onClick={handleSubmit} fullWidth margin="normal" loading ={isLoading}>
        Submit
      </LoadingButton>
    </Box>
  );
};

export default WalletAddressInput;
