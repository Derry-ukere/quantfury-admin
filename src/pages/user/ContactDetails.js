import React, { useState, } from 'react';
import { Box, TextField, Typography,Snackbar } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';


// redux
import { useDispatch, useSelector } from '../../redux/store';
import { setContractAddressReducer, } from '../../redux/slices/settings/setContactAddress';

const CompanyContactForm = () => {

  const dispatch = useDispatch();
  const { isLoading, error, success } = useSelector((state) => state.setContactAddress);

  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');



  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = () => {
    if (!address || !phoneNumber || !email) {
      // eslint-disable-next-line no-alert
      alert('Please fill in all fields.');
      return;
    }
    // Handle the submission logic here
    dispatch(setContractAddressReducer({
      address,
      phoneNumber,
      email,
    } ))

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
        Set Company Contact Details
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        id="address"
        label="Address"
        variant="outlined"
        value={address}
        onChange={handleAddressChange}
      />
      <TextField
        fullWidth
        margin="normal"
        id="phone-number"
        label="Phone Number"
        variant="outlined"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
      />
      <TextField
        fullWidth
        margin="normal"
        id="email"
        label="Email Address"
        variant="outlined"
        value={email}
        onChange={handleEmailChange}
      />
      <LoadingButton variant="contained" color="primary" onClick={handleSubmit} fullWidth margin="normal" loading={isLoading}>
        Submit
      </LoadingButton>
    </Box>
  );
};

export default CompanyContactForm;
