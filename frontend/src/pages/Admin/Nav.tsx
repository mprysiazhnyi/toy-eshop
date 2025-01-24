import { Box, Button, Stack, Tab, Tabs } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React from 'react';

export const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);

  let route = location.pathname;

  if (location.pathname.includes('/admin/products')) {
    route = '/admin/products';
  }

  return (
    <Box component="nav" mb={2}>
      <Tabs
        value={route}
        onChange={(e, newVal) => {
          navigate(newVal);
        }}
        aria-label="wrapped label tabs example"
      >
        <Tab value="/admin" label="Home" wrapped />
        <Tab value="/admin/orders" label="Orders" />
        <Tab value="/admin/products" label="Products" />
      </Tabs>
    </Box>
  );
};
