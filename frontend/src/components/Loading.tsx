import { Box, CircularProgress } from '@mui/material';
import React from 'react';

export const Loading = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="20vh"
      width="100%"
    >
      <CircularProgress size={60} color="primary" />
    </Box>
  );
};
