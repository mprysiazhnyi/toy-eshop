import React from 'react';
import { Navigate } from 'react-router-dom';
import Profile from '../Profile/Profile';
import { useAuth } from '../../contexts/AuthContext';

interface AuthContextType {
  loggedIn: boolean;
}

function ProtectedProfile() {
  const { loggedIn } = useAuth() as AuthContextType;

  return (
    <>
      {loggedIn === true && <Profile />}
      {loggedIn === false && <Navigate to={'/'} />}
    </>
  );
}

export default ProtectedProfile;
