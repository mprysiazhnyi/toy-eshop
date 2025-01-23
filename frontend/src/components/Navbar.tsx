import React, { FC } from 'react';
import styles from './Navbar/style.module.css';
import { Link } from 'react-router-dom';
import { Button, Badge } from '@mui/material'; // Import Material-UI components
import { useAuth } from '../contexts/AuthContext';
import { useBasket } from '../contexts/BasketContext';

const Navbar: FC = () => {
  const { loggedIn, user } = useAuth();
  const { items }: { items: any[] } = useBasket();

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link to="/">eCommerce</Link>
        </div>
        <ul className={styles.menu}>
          <li>
            <Link to="/">Products</Link>
          </li>
        </ul>
      </div>
      <div className={styles.right}>
        {!loggedIn && (
          <>
            <Link to="/signin">
              <Button variant="contained" color="success">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="contained" color="primary">
                Register
              </Button>
            </Link>
          </>
        )}
        {loggedIn && (
          <>
            {items.length > 0 && (
              <Link to="/basket">
                <Button variant="outlined" color="secondary">
                  Basket <Badge badgeContent={items.length} color="error" />
                </Button>
              </Link>
            )}

            {user?.role === 'admin' && (
              <Link to="/admin">
                <Button variant="text" color="secondary">
                  Admin
                </Button>
              </Link>
            )}

            <Link to="/profile">
              <Button variant="contained">Profile</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
