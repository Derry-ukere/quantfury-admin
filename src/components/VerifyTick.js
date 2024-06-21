import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// eslint-disable-next-line react/prop-types
const VerificationStatus = ({ verified }) => (
    <p >
      {verified ? (
        <>
          <CheckCircleIcon color="success" />
        </>
      ) : (
        <>
        </>
      )}
    </p>
  );

export default VerificationStatus;
