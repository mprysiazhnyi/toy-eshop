import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Badge, Typography, Box } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useBasket } from '../contexts/BasketContext';
import { ShoppingBasket } from '@mui/icons-material';

const Navbar: FC = () => {
  const { loggedIn, user } = useAuth();
  const { items }: { items: any[] } = useBasket();

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'white',
        zIndex: 1000,
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Box>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <img
                src="/assets/logo.jpg"
                alt="logo"
                height="70px"
                style={{ objectFit: 'cover', borderRadius: '8px' }}
              />
            </Link>
          </Box>

          <Box>
            <Button variant="text" component={Link} to="/">
              Home
            </Button>
            {!loggedIn ? (
              <>
                <Link to="/signin">
                  <Button variant="text">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="text">Register</Button>
                </Link>
              </>
            ) : (
              <>
                {user?.role === 'admin' && (
                  <Link to="/admin">
                    <Button variant="text">Admin</Button>
                  </Link>
                )}

                <Link to="/profile">
                  <Button variant="text">Profile</Button>
                </Link>
                {items.length > 0 && (
                  <Link to="/basket">
                    <Button variant="text">
                      <Box pr={1}>
                        <ShoppingBasket />
                      </Box>
                      <Badge
                        sx={{ marginBottom: 2 }}
                        badgeContent={items.length}
                        color="error"
                      />
                    </Button>
                  </Link>
                )}
              </>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
