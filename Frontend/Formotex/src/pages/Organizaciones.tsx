import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';

const Organizaciones: React.FC = () => {
  interface Organizacion {
    id: number;
    nombre: string;
  }

  const [organizaciones, setOrganizaciones] = useState<Organizacion[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrganizaciones = async () => {
      const response = await axios.get('http://localhost:3000/api/organizaciones');
      setOrganizaciones(response.data);
    };
    fetchOrganizaciones();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/organizaciones/${id}`);
      setOrganizaciones(organizaciones.filter(org => org.id !== id));
    } catch (error) {
      console.error('Error al eliminar la organización', error);
    }
  };

  return (
    <div className="container">
      <h2>Organizaciones</h2>
      {user?.role === 'admin' && (
        <button className="btn btn-primary" onClick={() => alert('Formulario para crear organización')}>
          Crear Organización
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
