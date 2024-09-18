import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Usuarios.css'; // Asegúrate de importar el CSS para estilos adicionales

const Usuarios: React.FC = () => {
  interface Usuario {
    id: number;
    username: string;
    role: string;
  }

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [editedRole, setEditedRole] = useState<string>('');
  const [newUserRole, setNewUserRole] = useState<string>('');

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/auth');
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener los usuarios', error);
      }
    };
    fetchUsuarios();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/api/auth/${id}`);
      setUsuarios(usuarios.filter(usuario => usuario.id !== id));
    } catch (error) {
      console.error('Error al eliminar el usuario', error);
    }
  };

  const handleEdit = async (id: number) => {
    try {
      await axios.put(`http://localhost:4000/api/auth/${id}`, { role: editedRole });
      setUsuarios(usuarios.map(usuario =>
        usuario.id === id ? { ...usuario, role: editedRole } : usuario
      ));
      setEditUserId(null);
    } catch (error) {
      console.error('Error al actualizar el usuario', error);
    }
  };

  return (
    <div className="container">
      <h2>Lista de Usuarios</h2>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.id}>
              <td>{usuario.username}</td>
              <td>
                {editUserId === usuario.id ? (
                  <select
                    value={editedRole}
                    onChange={(e) => setEditedRole(e.target.value)}
                    className="form-control"
                  >
                    <option value="empleado">Empleado</option>
                    <option value="admin">Administrador</option>
                  </select>
                ) : (
                  usuario.role
                )}
              </td>
              <td>
                {editUserId === usuario.id ? (
                  <>
                    <button
                      className="btn btn-success"
                      onClick={() => handleEdit(usuario.id)}
                    >
                      Guardar
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setEditUserId(null)}
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-warning mr-2"
                      onClick={() => {
                        setEditUserId(usuario.id);
                        setEditedRole(usuario.role);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(usuario.id)}
                    >
                      Eliminar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Usuarios;
