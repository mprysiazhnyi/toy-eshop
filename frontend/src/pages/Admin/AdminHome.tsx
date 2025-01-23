import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Stack } from '@mui/material';

const AdminHome: React.FC = () => {
  return (
    <Box p={3}>
      {/* Navigation Menu */}
      <Box component="nav" mb={4}>
        <Stack direction="row" spacing={2}>
          <Button component={Link} to="/admin" variant="outlined">
            Home
          </Button>
          <Button component={Link} to="/admin/orders" variant="outlined">
            Orders
          </Button>
          <Button component={Link} to="/admin/products" variant="outlined">
            Products
          </Button>
        </Stack>
      </Box>

      {/* Admin Dashboard Content */}
      <Typography variant="h4" mb={4}>
        Welcome, Admin
      </Typography>

      {/* Links to Admin Functionalities */}
      <Box ml={3}>
        <Typography variant="body1" mb={2}>
          You can see orders
          <Button
            component={Link}
            to="/admin/orders"
            variant="contained"
            sx={{ ml: 2 }}
          >
            Orders
          </Button>
        </Typography>
        <Typography variant="body1" mb={2}>
          You can see products
          <Button
            component={Link}
            to="/admin/products"
            variant="contained"
            sx={{ ml: 2 }}
          >
            Products
          </Button>
        </Typography>
        <Typography variant="body1" mb={2}>
          You can edit or delete your products
          <Button
            component={Link}
            to="/admin/products"
            variant="contained"
            sx={{ ml: 2 }}
          >
            Edit or Delete
          </Button>
        </Typography>
        <Typography variant="body1" mb={2}>
          You can upload new products
          <Button
            component={Link}
            to="/admin/products/new"
            variant="contained"
            sx={{ ml: 2 }}
          >
            New Products
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default AdminHome;
