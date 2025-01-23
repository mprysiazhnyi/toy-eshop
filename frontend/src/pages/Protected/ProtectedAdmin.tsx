import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AdminHome from '../Admin/AdminHome';

interface User {
  role: string;
  // Add other properties based on the actual user object if needed
}

interface AuthContextType {
  user: User | null;
  loggedIn: boolean;
}

function ProtectedAdmin() {
  const { user, loggedIn } = useAuth() as AuthContextType;

  return (
    <>
      {loggedIn === true && user?.role === 'admin' && <AdminHome />}
      {loggedIn === true && user?.role === 'user' && <Navigate to={'/'} />}
      {loggedIn === false && <Navigate to={'/'} />}
    </>
  );
}

export default ProtectedAdmin;
