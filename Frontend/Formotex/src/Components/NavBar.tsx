import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/organizaciones">Organizaciones</Link></li>
        <li><Link to="/equipos">Equipos</Link></li>
        {user?.role === 'admin' && (
          <>
            <li><Link to="/usuarios">Usuarios</Link></li>
          </>
        )}
        {user ? (
          <li><button onClick={logout}>Cerrar sesión</button></li>
        ) : (
          <>
            <li><Link to="/login">Iniciar sesión</Link></li>
            <li><Link to="/register">Registrarse</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
