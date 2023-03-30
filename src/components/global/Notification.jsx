import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import { useRecoilState } from 'recoil';
import { notificationAlertState } from '../../atoms/globalAtom';

const Notification = () => {
  const [alert, setAlert] = useRecoilState(notificationAlertState)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setAlert({ ...alert, open: false });
  };
  return (
    <Snackbar
      open={alert?.open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={handleClose}
        severity={alert?.severity}
        sx={{ width: '100%' }}
        variant="filled"
        elevation={6}
      >
        {alert?.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;