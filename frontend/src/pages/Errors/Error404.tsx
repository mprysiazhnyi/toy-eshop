import React from 'react';
import { Alert, AlertTitle, Snackbar } from '@mui/material';

function Error404() {
  return (
    <Snackbar open={true} autoHideDuration={6000}>
      <Alert severity="error" sx={{ width: '100%' }}>
        <AlertTitle>Error 404</AlertTitle>
        This page was not found.
      </Alert>
    </Snackbar>
  );
}

export default Error404;
