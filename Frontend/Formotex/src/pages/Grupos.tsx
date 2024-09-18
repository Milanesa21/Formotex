import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import './Grupos.css'; // Asegúrate de importar el CSS para estilos adicionales

const Grupos: React.FC = () => {
  const { organizacionId } = useParams<{ organizacionId: string }>();
  interface Grupo {
    id: number;
    nombre: string;
  }

  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newNombre, setNewNombre] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchGrupos = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/grupos/${organizacionId}`);
        setGrupos(response.data);
      } catch (error) {
        console.error('Error al obtener los grupos', error);
      }
    };
    fetchGrupos();
  }, [organizacionId]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/api/grupos/${id}`);
      setGrupos(grupos.filter(grupo => grupo.id !== id));
    } catch (error) {
      console.error('Error al eliminar el grupo', error);
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post(`http://localhost:4000/api/grupos/${organizacionId}`, { nombre: newNombre });
      setNewNombre('');
      setIsCreating(false);
      // Refrescar la lista de grupos
      const response = await axios.get(`http://localhost:4000/api/grupos/${organizacionId}`);
      setGrupos(response.data);
    } catch (error) {
      console.error('Error al crear el grupo', error);
    }
  };

  return (
    <div className="container">
      <h2>Grupos de la Organización</h2>
      {user?.role === 'admin' && (
        <>
          <button className="btn btn-primary mb-3" onClick={() => setIsCreating(!isCreating)}>
            {isCreating ? 'Cancelar' : 'Crear Grupo'}
          </button>
          {isCreating && (
            <div className="create-form">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Nombre del grupo"
                value={newNombre}
                onChange={(e) => setNewNombre(e.target.value)}
              />
              <button className="btn btn-success" onClick={handleCreate}>
                Crear
              </button>
            </div>
          )}
        </>
      )}
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {grupos.map(grupo => (
            <tr key={grupo.id}>
              <td>{grupo.nombre}</td>
              <td>
                {user?.role === 'admin' && (
                  <button className="btn btn-danger" onClick={() => handleDelete(grupo.id)}>Eliminar</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Grupos;
