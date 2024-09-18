import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';

export interface AuthContextType {
  isAuthenticated: boolean;
  user: { username: string; role: string } | null;
}

interface AuthContextProps extends AuthContextType {
  token: string | null;
  login: (token: string) => void;
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
    if (savedToken) {
      setToken(savedToken);
      fetchUserData(savedToken);
    }
  }, []);

  const fetchUserData = async (token: string) => {
    try {
      const response = await axios.get('http://localhost:4000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setUser({ username: response.data.username, role: response.data.role });
        setIsAuthenticated(true);
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Failed to fetch user data', error);
      setIsAuthenticated(false);
      setToken(null);
      localStorage.removeItem('token');
    }
  };

  const login = (token: string) => {
    setToken(token);
    localStorage.setItem('token', token);
    fetchUserData(token);
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
