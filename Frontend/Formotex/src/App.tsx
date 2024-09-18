import React from 'react';
import { BrowserRouter as Router, Route, Routes as RouterRoutes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Organizaciones from './pages/Organizaciones';
import Grupos from './pages/Grupos';
import Equipos from './pages/Equipos';
import Usuarios from './pages/Usuarios';
import { AuthProvider, useAuth } from './Context/AuthContext';
import Navbar from './Components/NavBar';
import './App.css'; // Importa el archivo CSS

const AppRoutes: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Router>
      <Navbar />
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
          element={isAuthenticated ? <Organizaciones /> : <Navigate to="/login" />}
        />
        <Route
          path="/organizaciones/:organizacionId/grupos"
          element={isAuthenticated ? <Grupos /> : <Navigate to="/login" />}
        />
        <Route
          path="/equipos"
          element={isAuthenticated ? <Equipos /> : <Navigate to="/login" />}
        />
        <Route
          path="/usuarios"
          element={isAuthenticated && user?.role === 'admin' ? <Usuarios /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={isAuthenticated ? (
            <div className="app-container">
              <h1 className="greeting">Bienvenido {user?.username}</h1>
              <div className="button-group">
                <a href="/organizaciones" className="button">Organizaciones</a>
                <a href="/equipos" className="button">Equipos</a>
                {user?.role === 'admin' && (
                  <a href="/usuarios" className="button">Usuarios</a>
                )}
              </div>
            </div>
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </RouterRoutes>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
