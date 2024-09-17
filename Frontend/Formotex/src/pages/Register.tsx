import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>(''); 
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const userData = {
      username,
      password,
      role,
    };

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Error al registrar');
      } else {
        const data = await response.json();
        console.log('Registro exitoso', data);
      }
    } catch (error) {
      setError('Hubo un error en la conexión');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">Role:</label>
          <input
            type="text"
            className="form-control"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
