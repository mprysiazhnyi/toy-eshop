import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import { fetchLogout, fetchMe } from '../api';
import { CircularProgress, Box } from '@mui/material';

interface User {
  // Define the structure of User object based on your API response
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  loggedIn: boolean;
  user: User | null;
  login: (data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  }) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const me = await fetchMe();

        if (Object.keys(me).length === 0) {
          setLoggedIn(false);
        } else {
          setLoggedIn(true);
          setUser(me as User);
        }

        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    })();
  }, []);

  const login = (data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  }): void => {
    setLoggedIn(true);
    setUser(data.user);

    localStorage.setItem('access-token', data.accessToken);
    localStorage.setItem('refresh-token', data.refreshToken);
  };

  const logout = async (): Promise<void> => {
    setLoggedIn(false);
    setUser(null);

    await fetchLogout();

    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
  };

  const values = {
    loggedIn,
    user,
    login,
    logout,
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuth };
