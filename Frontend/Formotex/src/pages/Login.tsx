import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar Bootstrap en tu proyecto
import './Login.css'; // Asegúrate de importar tu archivo CSS


const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', {
        username,
        password,
      });
      const { token } = response.data; // Asume que `token` y `role` están en la respuesta

      // Guardar el token y el rol en localStorage
      login(token);

      alert('Inicio de sesión exitoso');

      // Redirigir a EquipmentList después de 1 segundo
      setTimeout(() => {
        navigate('/EquipmentList');
      }, 1000);
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      setError('Error al iniciar sesión');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2 className="login-title">Iniciar sesión</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Usuario"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Iniciar sesión</button>
        </form>
        {error && <p className="login-error">{error}</p>}
        <p className="login-register-link">¿No tienes una cuenta? <a href="/register">Regístrate aquí</a></p>
      </div>
    </div>
  );
};

export default Login;
