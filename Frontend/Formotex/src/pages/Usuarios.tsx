import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Usuarios: React.FC = () => {
  interface Usuario {
    id: number;
    username: string;
    role: string;
  }
  
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const response = await axios.get('http://localhost:3000/api/auth');
      setUsuarios(response.data);
    };
    fetchUsuarios();
  }, []);

  return (
    <div className="container">
      <h2>Lista de Usuarios</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.username}</td>
              <td>{usuario.role}</td>
              <td>
                <button className="btn btn-warning">Editar</button>
                <button className="btn btn-danger">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Usuarios;
