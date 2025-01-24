import { Box, CircularProgress } from '@mui/material';
import React from 'react';

export const Loading = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      top={0}
      width="100%"
      position={'absolute'}
    >
      <CircularProgress size={60} color="primary" />
    </Box>
  );
};
