import React, { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, Typography,Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

import LoadingButton from '@mui/lab/LoadingButton';



import { UploadAvatar } from '../../components/upload';

// redux
import { useDispatch, useSelector } from '../../redux/store';
import { uploadBarCode, } from '../../redux/slices/settings/uploadBarCode';


const BarcodeUpload = () => {
    const dispatch = useDispatch();
    const {  isLoading,error, success } = useSelector((state) => state.uploadBarCode);


  const [barcodeType, setBarcodeType] = useState('');
  const [file, setFile] = React.useState('');
  const [avatarUrl, setAvatarUrl] = React.useState(null);

  const handleDropAvatar = React.useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
 
    if (file) {
      setFile(file)
      setAvatarUrl(
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
    }
  }, []);

  const handleBarcodeTypeChange = (event) => {
    setBarcodeType(event.target.value);
  };

  const uploadFIle = (e) => {
    e.preventDefault();
    dispatch(uploadBarCode(file, barcodeType))
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
        Upload Your Wallet Address Barcode
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel id="barcode-type-label">Select Barcode Type</InputLabel>
        <Select
          labelId="barcode-type-label"
          id="barcode-type"
          value={barcodeType}
          onChange={handleBarcodeTypeChange}
          label="Select Barcode Type"
        >
          <MenuItem value="USDTBARCODE">USDT</MenuItem>
          <MenuItem value="BTCBARCODE">BTC</MenuItem>
          <MenuItem value="ETHBARCODE">ETH</MenuItem>
        </Select>
      </FormControl>
      <UploadAvatar
                        accept="image/*"
                        file={avatarUrl}
                        onDrop={handleDropAvatar}
                        helperText={
                          <Typography
                            variant="caption"
                            sx={{
                              mt: 2,
                              mx: 'auto',
                              display: 'block',
                              textAlign: 'center',
                              color: 'text.secondary',
                            }}
                          >
                            Allowed *.jpeg, *.jpg, *.png, *.gif
                            <br /> max size of 5mb
                          </Typography>
                        }
                    />
      <LoadingButton variant="contained" color="primary" onClick={uploadFIle} fullWidth margin="normal" loading= {isLoading}>
        Update Barcode
      </LoadingButton>
    </Box>
  );
};

export default BarcodeUpload;
