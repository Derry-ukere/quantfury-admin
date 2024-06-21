import React from 'react'
import { Snackbar,Alert } from '@mui/material';


// eslint-disable-next-line react/prop-types
const SuccessErrorFeedback = ({success,error = null}) => (
    <div>
        <Snackbar
          open={success || error}
          autoHideDuration={600}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert  severity="success" sx={{ width: '100%' }}>
           {(success  && "success") || (error && error)}
          </Alert>
        </Snackbar>
    </div>
  )

export default SuccessErrorFeedback