import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import './Organizaciones.css'; // Asegúrate de importar el CSS para estilos adicionales

const Organizaciones: React.FC = () => {
  interface Organizacion {
    id: number;
    nombre: string;
  }

  const [organizaciones, setOrganizaciones] = useState<Organizacion[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newNombre, setNewNombre] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrganizaciones = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/organizaciones');
        setOrganizaciones(response.data);
      } catch (error) {
        console.error('Error al obtener organizaciones', error);
      }
    };
    fetchOrganizaciones();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/api/organizaciones/${id}`);
      setOrganizaciones(organizaciones.filter(org => org.id !== id));
    } catch (error) {
      console.error('Error al eliminar la organización', error);
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post('http://localhost:4000/api/organizaciones', { nombre: newNombre });
      setNewNombre('');
      setIsCreating(false);
      // Refrescar la lista de organizaciones
      const response = await axios.get('http://localhost:4000/api/organizaciones');
      setOrganizaciones(response.data);
    } catch (error) {
      console.error('Error al crear la organización', error);
    }
  };

  return (
    <div className="container">
      <h2>Organizaciones</h2>
      {user?.role === 'admin' && (
        <>
          <button className="btn btn-primary mb-3" onClick={() => setIsCreating(!isCreating)}>
            {isCreating ? 'Cancelar' : 'Crear Organización'}
          </button>
          {isCreating && (
            <div className="create-form">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Nombre de la organización"
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
          {organizaciones.map(org => (
            <tr key={org.id}>
              <td>{org.nombre}</td>
              <td>
                {user?.role === 'admin' && (
                  <>
                    <button className="btn btn-warning mr-2">Editar</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(org.id)}>Eliminar</button>
                  </>
                )}
                <button className="btn btn-info">Ver Grupos</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Organizaciones;
