import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Typography, Button, Box, Alert } from '@mui/material';
import { Link } from 'react-router-dom';

function Profile() {
  const { user, logout, loggedIn } = useAuth();

  if (!user) {
    return <div>No user</div>;
  }

  const handleLogout = async () => {
    logout();
  };

  return (
    <div>
      {!loggedIn && (
        <>
          <Alert severity="warning">
            You are not logged in. Please login and try again.
          </Alert>
          <Link to="/signin">
            <Button sx={{ marginTop: 2 }} color="success" variant="contained">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button
              sx={{ marginTop: 2, marginLeft: 2 }}
              color="primary"
              variant="contained"
            >
              Register
            </Button>
          </Link>
        </>
      )}
      {loggedIn && (
        <>
          <Typography variant="h5">Profile</Typography>
          <Box mb={2} mt={2}>
            <Typography>Email: {user.email}</Typography>
            <Typography>Role: {user.role}</Typography>
          </Box>

          <Link to="/">
            <Button
              color="secondary"
              variant="contained"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Profile;
