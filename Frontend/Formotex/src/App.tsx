import React from 'react';
import { BrowserRouter as Router, Route, Routes as RouterRoutes, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Organizaciones from './pages/Organizaciones';
import Grupos from './pages/Grupos';
import Equipos from './pages/Equipos';
import Usuarios from './pages/Usuarios';
import { AuthProvider, useAuth } from './Context/AuthContext';
import Navbar from './Components/NavBar';
import './App.css'; 

const AppRoutes: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/login' && location.pathname !== '/register' && <Navbar />}
      <RouterRoutes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/organizaciones"
          element={<Organizaciones />}
        />
        <Route
          path="/organizaciones/:organizacionId/grupos"
          element={<Grupos />}
        />
        <Route
          path="/equipos"
          element={<Equipos />}
        />
        <Route
          path="/usuarios"
          element={<Usuarios />}
        />
        <Route
          path="/"
          element={isAuthenticated ? (
            <div className="app-container">
              <h1 className="greeting">Bienvenido {user?.username}</h1>
              <div className="button-group">
                <a href="/organizaciones" className="button">Organizaciones</a>
                {user?.role === 'admin' && (
                  <a href="/usuarios" className="button">Usuarios</a>
                )}
              </div>
            </div>
          ) : (
            <Navigate to="/login" replace />
          )}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </RouterRoutes>
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
