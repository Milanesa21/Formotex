import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar Bootstrap en tu proyecto

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirige al login después de cerrar sesión
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">Inicio</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/organizaciones">Organizaciones</Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            {user ? (
              <li className="nav-item">
                <button className="btn btn-outline-danger" onClick={handleLogout}>Cerrar sesión</button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="btn btn-outline-primary" to="/login">Iniciar sesión</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-outline-secondary" to="/register">Registrarse</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
