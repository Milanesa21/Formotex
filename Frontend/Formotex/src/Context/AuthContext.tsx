import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';

interface AuthContextProps {
  isAuthenticated: boolean;
  user: { username: string; role: string } | null;
  token: string | null;
  login: (token: string, role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedRole = localStorage.getItem('role');
    if (savedToken && savedRole) {
      setToken(savedToken);
      fetchUserData(savedToken, savedRole);
    }
  }, []);

  const fetchUserData = async (token: string, role: string) => {
    try {
      const response = await axios.get('http://localhost:3000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser({ username: response.data.username, role });
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Failed to fetch user data', error);
      setIsAuthenticated(false);
    }
    console.log('fetchUserData');
  };

  const login = (token: string, role: string) => {
    setToken(token);
    localStorage.setItem('token', token);
    fetchUserData(token, role);
    console.log('login');
    console.log(token);
    console.log(role);
    console.log(user);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
