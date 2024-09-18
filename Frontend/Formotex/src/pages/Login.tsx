import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        username,
        password,
      });
      const { token, role } = response.data; // Asume que `token` y `role` están en la respuesta

      // Guardar el token y el rol en localStorage
      login(token, role);

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
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuario"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
        <button type="submit">Iniciar sesión</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>¿No tienes una cuenta? <a href="/register">Regístrate aquí</a></p>
    </div>
  );
};

export default Login;
