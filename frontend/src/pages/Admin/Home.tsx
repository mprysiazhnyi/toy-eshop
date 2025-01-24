import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Stack } from '@mui/material';
import { Nav } from './Nav';

const Home: React.FC = () => {
  return (
    <Box>
      <Nav />
      {/* Admin Dashboard Content */}
      <Typography variant="h5" mb={2}>
        Welcome, Admin
      </Typography>

      {/* Links to Admin Functionalities */}
      <Box>
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

export default Home;
