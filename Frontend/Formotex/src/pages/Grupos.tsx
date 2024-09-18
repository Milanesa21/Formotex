import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Grupos: React.FC = () => {
  const { organizacionId } = useParams<{ organizacionId: string }>();
  interface Grupo {
    id: number;
    nombre: string;
  }

  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchGrupos = async () => {
      const response = await axios.get(`http://localhost:3000/api/grupos/${organizacionId}`);
      setGrupos(response.data);
    };
    fetchGrupos();
  }, [organizacionId]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/grupos/${id}`);
      setGrupos(grupos.filter(grupo => grupo.id !== id));
    } catch (error) {
      console.error('Error al eliminar el grupo', error);
    }
  };

  return (
    <div className="container">
      <h2>Grupos de la Organización</h2>
      {user?.role === 'admin' && (
        <button className="btn btn-primary" onClick={() => alert('Formulario para crear grupo')}>
          Crear Grupo
        </button>
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
                  <>
                    <button className="btn btn-danger" onClick={() => handleDelete(grupo.id)}>Eliminar</button>
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

export default Grupos;
